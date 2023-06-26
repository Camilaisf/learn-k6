import http from "k6/http";
import { check, fail, sleep } from "k6";
import { Counter } from "k6/metrics";
import { Gauge } from "k6/metrics";
import { Rate } from "k6/metrics";
import { Trend } from "k6/metrics";

export const options = {
    vus: 1,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration:[{threshold: 'p(95) < 200', abortOnFail:true,  delayAbortEval: '10s'}],
        //se o teste nao atingir p(95) < 200 ele será abortado - abortOnFail:true
        //delayAbortEval delay para nao ser abortado instantaneamente, somente se passar 10s
        // é interessante quando estiver executando em uma pipe ou cloud
        checks: [ 'rate > 0.99']
    }
}

const calls = new Counter('get_customer_counter')
const myGauge = new Gauge('get_blocked_time')
const myRateFail = new Rate('get_customer_fail_rate')
const myRate = new Rate('get_customer_success_rate')
const myTrend = new Trend('get_customer_duration')

export default function(){
 var text;
   const req =  http.get('http://test.k6.io')
   
   let duratiomMsg = 'Maximo de duração da minha req ${5000/1000}s'
    if(!check (req, {
        "máximo de duração": (req) => req.timings.duration < 5000

    })){
        fail(duratiomMsg);
    }

    sleep(1)

    //contador
    calls.add(1)
    //medidor
    myGauge.add(req.timings.blocked)
    //taxa
    myRate.add(req.status != 0 && req.status < 399)

    myRateFail.add(req.status == 0 || req.status > 399)

    //tendencia
    myTrend.add(req.timings.duration)

}