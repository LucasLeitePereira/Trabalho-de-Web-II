const options = document.querySelectorAll('button');

const programa1 = ['VERMELHO', 'AZUL', 'VERDE', 'AZUL'];
const programa2 = ['VERMELHO', 'VERDE', 'VERDE', 'AZUL'];
const programa3 = ['VERDE', 'AZUL', 'VERMELHO', 'VERMELHO'];

let idxPergunta = 0;
let tentRest = 3;
var pontuacao = 0;

// True = lista atual, False = lista anterior ou lista futura. A ideia disso é tratar como uma chacklist de listas já concluidas
let isPrograma01 = true; 
let isPrograma02 = false;
let isPrograma03 = false;


function isRight(resposta, gabarito, index, pts) { // Função que verifica se a resposta é igual ao gabarito
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

function pularFase() {
    tentRest = 3; // Ao errar em todas as tentativas, o numero de tentativas retorna a 3 na próxima questão
    idxPergunta++;
    console.log("Pulou a fase");
}

options.forEach((option) => {
    option.addEventListener('click', (event) => {
        const resposta = event.currentTarget.id; // A resposta é com base no nome do id do
        console.log(resposta);

        // Cada "Programa" seguira o seguinte escopo, verificar o numero de tentativas restantes atual, chamar a função isRight() e passar os seus devidos parametros. 
        // Se o retorno da função for 'false', então será executado o else, que chama a função isWrong;

        // Esse escopo de função é facilmente replicavel, basta alterar o numero do 'isPrograma' dentro primeiro if, e dentro de cada 'programa' que está função isRight()

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
                    pularFase()
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
                    pularFase()
                }
            }
        }

        if (isPrograma03) {
            console.log("Lista 03");
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
                    pularFase()
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
            idxPergunta = 0; // Reseta o index
            tentRest = 3; // Reseta o numero de tentativas
            console.log("Mudando para lista 02");
        }
    }
    else if (isPrograma02) {
        if (idxPergunta === programa1.length) {
            isPrograma02 = false;
            isPrograma03 = true;
            idxPergunta = 0; // Reseta o index
            tentRest = 3; // Reseta o numero de tentativas
            console.log("Mudando para lista 03");
        }
    }
    else if (isPrograma03) {
        if (idxPergunta === programa1.length) {
            isPrograma03 = false; // Quando a ultima lista recebe 'false' qualquer opção escolhida será indiferente 
            console.log("Acabaram as listas");
            console.log("Pontuação: ", pontuacao);
        }
    }
}, 1000);