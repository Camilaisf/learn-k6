/*

Public API: Exemplo 
    - Buscar crocodilo por id
Criterios:
    - Perfomance teste
        - Ramp up 10 VU em 10s
        - Carga 10 VU por 10s
        - Ramp down 0 VU em 10s
    -Limites:
        - Requisiçao com sucesso > 95%
        Tempo requisição p(90) < 200

*/

import { group, sleep } from 'k6';
import getCrocodiles from '../requests/getCrocodiles.js';
import { SharedArray } from 'k6/data';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

//config
export const options = {
    stages:[
        { duration: '10s', target:10},
        { duration: '10s', target:10},
        { duration: '10s', target:0},
    ],

    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    }
  

}
const data = new SharedArray('Leitura de json', function() {
    return JSON.parse(open('../data/data.json')).crocodilos
});

export default () => {
    
    const getCrododiles = new getCrocodiles();
    const id = data[Math.floor(Math.random() * data.length)].id

    group('load test', () => {
        getCrododiles.getCrocodilesIdRequest(id);
    })
    sleep(1);
  }

  export function handleSummary(data) {
    return {
      "reports/report-k6.html": htmlReport(data),
    };
  }

