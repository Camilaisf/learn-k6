/*

Private API
    - Buscando todos os crocodilos
Criterios:
    - Perfomance test
        - 100VU por 10s
    -Limites:
        - Requisiçao com falha inferior a 1% - 99% de sucesso
        - Duração da requisição p(95) < 250

*/



import { group, sleep } from 'k6';
import Auth from '../requests/postCrocodiles.js';
import getCrocodiles from '../requests/getCrocodiles.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 100,
    duration: '10s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 250']
    }
}

export default function () {
    const auth = new Auth();
    const getCrododiles = new getCrocodiles();
  
    group('perfomance test', () => {
        getCrododiles.getCrocodilesRequest(auth.getToken());
    })
    sleep(1);
  }


export function handleSummary(data) {
    return {
      "reports/report-k6.html": htmlReport(data),
    };
  }

