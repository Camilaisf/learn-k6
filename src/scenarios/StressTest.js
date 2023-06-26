/*

Pregistration e auth : login
    - Realizar o login de um novo usuário
Criterios:
    - stress teste
        - Ramp up 5 VU em 5s
        - Carga 5 VU por 5s
        - Ramp up 50 VU em 2s
        - Carga 50 VU por 2s
        - Ramp down 0 VU em 5s
    -Limites:
        - Requisiçao com falha inferior a 1% - 99% de sucesso

*/

import { group, sleep } from "k6";
import { SharedArray } from "k6/data";
import Auth from '../requests/postCrocodiles.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//config
export let options = {
    stages:[
        { duration: '5s', target:5},
        { duration: '5s', target:5},
        { duration: '2s', target:50},
        { duration: '2s', target:50},
        { duration: '5s', target:0},
    ],

    thresholds: {
     http_req_failed: ['rate < 0.01 ']
    }
}


const csvdata = new SharedArray('Data reading', function() {
    return papaparse.parse(open('../data/users.csv'), {header: true }).data;
});

//exec
export default function( ) {
    const user = csvdata[Math.floor(Math.random() * csvdata.length)].email;
    const pass = csvdata[Math.floor(Math.random() * csvdata.length)].pwrd;

    const auth = new Auth();

    group('stress test', () => {
      auth.postAuth(user, pass);
    })
    sleep(1);
  }
  
  export function handleSummary(data) {
    return {
      "reports/report-k6.html": htmlReport(data),
    };
  
}