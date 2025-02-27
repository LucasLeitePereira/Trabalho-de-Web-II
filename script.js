const options = document.querySelectorAll('button');
const numTentativas = document.getElementById('numTentativas');
const numCode = document.getElementById('numCode');


const songRight = document.getElementById('songRight');
const songWrong = document.getElementById('songWrong');
const songNext = document.getElementById('songNext');

const programa1 = [1, 'VERMELHO', 'VERDE', 'AZUL'];
const programa2 = [2, 'VERMELHO', 'VERDE', 'VERDE', 'AZUL'];
const programa3 = [3, 'VERDE', 'AZUL', 'VERMELHO', 'VERMELHO'];

let idxPergunta = 1;
let tentRest = 3;
var pontuacao = 0;

// True = lista atual, False = lista anterior ou lista futura. A ideia disso é tratar como uma chacklist de listas já concluidas
let isPrograma01 = true; 
let isPrograma02 = false;
let isPrograma03 = false;


function isRight(resposta, gabarito, index, pts) { // Função que verifica se a resposta é igual ao gabarito
    if (resposta === gabarito[index]) {
        songRight.play();
        idxPergunta++; 
        console.log('+',pts,'pts');
        pontuacao += pts;
        tentRest = 3; 
        numTentativas.innerHTML = `Tentativas ${tentRest} de 3`; 
        return true;
    } else {
        songWrong.play();
        return false; // Executa o else, que por sua vez chama o isWrong()
    }
}

function isWrong() { // Função para caso o jogador erre a pergunta
    tentRest--;
    console.log("Tentativas restantes: ", tentRest);
    numTentativas.innerHTML = `Tentativas ${tentRest} de 3`; 
}

function pularFase() {
    tentRest = 3; // Ao errar em todas as tentativas, o numero de tentativas retorna a 3 na próxima questão
    idxPergunta++;
    console.log("Pulou a fase");
    numTentativas.innerHTML = `Tentativas ${tentRest} de 3`; 
}

options.forEach((option) => {
    option.addEventListener('click', (event) => {
        const resposta = event.currentTarget.id; // A resposta é com base no nome do id do
        console.log(resposta);

        // Cada "Programa" seguira o seguinte escopo, verificar o numero de tentativas restantes atual, chamar a função isRight() e passar os seus devidos parametros. 
        // Se o retorno da função for 'false', então será executado o else, que chama a função isWrong;

        // Esse escopo de função é facilmente replicavel, basta alterar o numero do 'isPrograma' dentro primeiro if, e dentro de cada 'programa' que está função isRight()

        if (isPrograma01) { 
            numCode.innerHTML = `-> ${idxPergunta}`;
            if (tentRest === 3){
                if (isRight(resposta, programa1, idxPergunta, 3)) {
                } else {
                    isWrong(); 
                }
            } else if (tentRest === 2) {
                if (isRight(resposta, programa1, idxPergunta, 2)) {
                } else {
                    isWrong();  
                }
            } else if (tentRest === 1) {
                if (isRight(resposta, programa1, idxPergunta, 1)) {
                } else {
                    isWrong();     
                }
            } else {
                if (isRight(resposta, programa1, idxPergunta, 0)) {
                } else {
                    pularFase()
                }
            }
            numCode.innerHTML = `-> ${idxPergunta}`;
        }

        if (isPrograma02) {
            numCode.innerHTML = `-> ${idxPergunta}`;
            if (tentRest === 3){
                if (isRight(resposta, programa2, idxPergunta, 3)) {
                } else {
                    isWrong();  
                }
            } else if (tentRest === 2) {
                if (isRight(resposta, programa2, idxPergunta, 2)) {
                } else {
                    isWrong();   
                }
            } else if (tentRest === 1) {
                if (isRight(resposta, programa2, idxPergunta, 1)) {

                } else {
                    isWrong();    
                }
            } else {
                if (isRight(resposta, programa2, idxPergunta, 0)) {
                } else {
                    pularFase()
                }
            }
            numCode.innerHTML = `-> ${idxPergunta}`;
        }

        if (isPrograma03) {
            console.log("Lista 03");
            if (tentRest === 3){
                if (isRight(resposta, programa3, idxPergunta, 3)) {
                } else {
                    isWrong();   
                }
            } else if (tentRest === 2) {
                if (isRight(resposta, programa3, idxPergunta, 2)) {
                } else {
                    isWrong();    
                }
            } else if (tentRest === 1) {
                if (isRight(resposta, programa3, idxPergunta, 1)) {
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
            idxPergunta = 1; // Reseta o index
            tentRest = 3; // Reseta o numero de tentativas
            console.log("Mudando para lista 02");
            songNext.play();
        }
    }
    else if (isPrograma02) {
        if (idxPergunta === programa2.length) {
            isPrograma02 = false;
            isPrograma03 = true;
            idxPergunta = 1; // Reseta o index
            tentRest = 3; // Reseta o numero de tentativas
            console.log("Mudando para lista 03");
            songNext.play();
        }
    }
    else if (isPrograma03) {
        if (idxPergunta === programa3.length) {
            isPrograma03 = false; // Quando a ultima lista recebe 'false' qualquer opção escolhida será indiferente 
            console.log("Acabaram as listas");
            numCode.innerHTML = `Pontuação: ${pontuacao}pts`;
        }
    }
    
}, 1000);