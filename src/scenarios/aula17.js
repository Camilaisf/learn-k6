/*

Pregistration e auth : Registro
    - Realizar o registro de um novo usuário
Criterios:
    - Perfomance teste
        - Carga 10 VU por 10s
    -Limites:
        - Requisiçao com falha inferior a 1% - 99% de sucesso
        - Tempo de requisição p(95) < 500
        - Requisiçao com sucesso superior a 95%

*/

import { check, sleep } from "k6";
import http from "k6/http";

//config
export const options = {
    stages:[
        { duration: '10s', target:10}
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 500'],
        http_req_failed: ['rate < 0.01 ']
    }
}

//exec
export default function( ) {
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';
    const USER = `${Math.random()}@mail.com`;
    const PASS = 'user123';
    console.log(USER +PASS)
    const res = http.post(`${BASE_URL}/user/register`, {
        username: USER,
        first_name: 'crocodilo',
        last_name: 'dino',
        email: USER,
        password: PASS
    })

    check(res,
        {
            'register success': (r) => r.status === 200
        } );

        sleep(1)
}