const options = document.querySelectorAll('button');

const programa1 = ['VERMELHO', 'AZUL', 'VERDE', 'AZUL'];
const programa2 = ['VERMELHO', 'VERDE', 'VERDE', 'AZUL'];
const programa3 = ['VERDE', 'AZUL', 'VERMELHO', 'VERMELHO'];

let idxPergunta = 0;
let tentRest = 3;
var pontuacao = 0;

// True = lista atual, False = lista anterior ou lista futura
let isPrograma01 = true; 
let isPrograma02 = false;
let isPrograma03 = false;


function isRight(resposta, gabarito, index, pts) {
    if (resposta === gabarito[index]) {
        idxPergunta++;
        console.log('+',pts,'pts');
        pontuacao += pts;
        tentRest = 3;
        return true;
    } else {
        return false; // Executa o else, que por sua vez chama o isWrong()
    }
}

function isWrong() { // Função para caso o jogador erre a pergunta
    tentRest--;
    console.log("Tentativas restantes: ", tentRest);  
}

options.forEach((option) => {
    option.addEventListener('click', (event) => {
        const resposta = event.currentTarget.id; // A resposta é com base no nome do id do
        console.log(resposta);

        if (isPrograma01) {
            console.log("Lista 01");
            if (tentRest === 3){
                if (isRight(resposta, programa1, idxPergunta, 30)) {
                } else {
                    isWrong(); 
                }
            } else if (tentRest === 2) {
                if (isRight(resposta, programa1, idxPergunta, 20)) {
                } else {
                    isWrong();  
                }
            } else if (tentRest === 1) {
                if (isRight(resposta, programa1, idxPergunta, 10)) {
                } else {
                    isWrong();     
                }
            } else {
                if (isRight(resposta, programa1, idxPergunta, 0)) {
                } else {
                    tentRest = 3;
                    idxPergunta++;
                    console.log("Pulou a fase");
                }
            }
        }

        if (isPrograma02) {
            console.log("Lista 02");
            if (tentRest === 3){
                if (isRight(resposta, programa2, idxPergunta, 30)) {
                } else {
                    isWrong();  
                }
            } else if (tentRest === 2) {
                if (isRight(resposta, programa2, idxPergunta, 20)) {
                } else {
                    isWrong();   
                }
            } else if (tentRest === 1) {
                if (isRight(resposta, programa2, idxPergunta, 10)) {

                } else {
                    isWrong();    
                }
            } else {
                if (isRight(resposta, programa2, idxPergunta, 0)) {
                } else {
                    tentRest = 3;
                    idxPergunta++;
                    console.log("Pulou a fase");
                }
            }
        }

        if (isPrograma03) {
            console.log("Lista 02");
            if (tentRest === 3){
                if (isRight(resposta, programa3, idxPergunta, 30)) {
                } else {
                    isWrong();   
                }
            } else if (tentRest === 2) {
                if (isRight(resposta, programa3, idxPergunta, 20)) {
                } else {
                    isWrong();    
                }
            } else if (tentRest === 1) {
                if (isRight(resposta, programa3, idxPergunta, 10)) {
                } else {
                    isWrong();    
                }
            } else {
                if (isRight(resposta, programa3, idxPergunta, 0)) {
                } else {
                    tentRest = 3;
                    idxPergunta++;
                    console.log("Pulou a fase");
                }
            }
        }
        })
    })

setInterval(() => { // A cada um segundo, a função verifica se o jogador ja terminou a lista para poder passar para a próxima
    if (isPrograma01) {
        if (idxPergunta === programa1.length) {
            isPrograma01 = false;
            isPrograma02 = true;
            idxPergunta = 0;
            tentRest = 3;
            console.log("Mudando para lista 02");
        }
    }
    else if (isPrograma02) {
        if (idxPergunta === programa1.length) {
            isPrograma02 = false;
            isPrograma03 = true;
            idxPergunta = 0;
            tentRest = 3;
            console.log("Mudando para lista 03");
        }
    }
    else if (isPrograma03) {
        if (idxPergunta === programa1.length) {
            isPrograma03 = false;
            console.log("Acabaram as listas");
            console.log("Pontuação: ", pontuacao);
        }
    }
}, 1000);