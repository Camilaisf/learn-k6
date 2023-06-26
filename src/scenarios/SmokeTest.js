/*Public API: 
- Buscar todos os crocodilos
- Critérios
    -Smoke test
        -1 usuário por 30 segundos
    -Limites:
        - Requisicao com sucesso > 99%
*/


import { group, sleep } from 'k6';
import Auth from '../requests/postCrocodiles.js';
import getCrocodiles from '../requests/getCrocodiles.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";


//config
export const options = {
    vus: 1,
    duration: '3s',
    thresholds: {
        checks: ['rate > 0.99']
    }

}

export default function () {
    const auth = new Auth();
    const getCrododiles = new getCrocodiles();
  
    group('smoke test', () => {
        getCrododiles.getCrocodilesRequest(auth.getToken());
    })
    sleep(1);
  }


export function handleSummary(data) {
    return {
      "reports/report-k6.html": htmlReport(data),
    };
  }
