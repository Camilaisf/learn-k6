import Aula2 from "./src/scenarios/aula2.js"
import { group, sleep } from "k6"

export default function(){
    group( 'TEST - Controller', () => {
        Aula2();
    })

    sleep(1)

    group('soak test', () => {
        auth.postAuth(user, pass);
      })
      sleep(1);
    }
