import http from 'k6/http';
import { check, sleep } from 'k6';
import Url from "../links.js";

export default class Login {

    getToken() {
        const loginRes = http.post(`${Url.getBaseUrl()}/auth/token/login/`, {
            username: '0.9568168410036498@mail.com',
            password: 'user123'
        });
        const token = loginRes.json('access');
        return token;
    }

    postAuth(user, password) {
        const response = http.post(`${Url.getBaseUrl()}/auth/token/login/`, {
            username: user,
            password: password,
        });

        check(response, {
            'Sucesso login': (resp) => resp.status === 200,
            'Token gerado': (resp) => resp.json('access') !== '',
        });

        sleep(1)
    }
}