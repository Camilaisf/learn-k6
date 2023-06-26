//1. inicializaçao
//carregamento de arquivos locais, importacao de modulos
import sleep from 'k6';


//2. configuracao
//configuramos dados que sao compartilhados entre todos os usuários virtuais, todas as VUS
// Etapa chamada uma única vez durante todo o ciclo de vida do teste.
//pode ter mais de um bloco 
export const options = {
    vus: 1,
    duration: '10s'
}

//3. execucao // codigo vu
//realizar solicitacoes http, emitir metricas
export default function() {
    console.log("testando o k6");
    sleep(1);
}

//4. desmontagem
//enviar resultados por um web hook, tratamento de dados e encerrar o teste
//executada uma única vez
export function teardown(data){
    console.log(data)
}