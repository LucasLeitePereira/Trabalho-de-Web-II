const options = document.querySelectorAll('button');
const numTentativas = document.getElementById('numTentativas');
const numCode = document.getElementById('numCode');

const songRight = document.getElementById('songRight');
const songWrong = document.getElementById('songWrong');
const songNext = document.getElementById('songNext');

const programs = [
    [41, 'VERMELHO', 'VERDE', 'AZUL'],          
    [42, 'VERMELHO', 'VERDE', 'VERDE', 'AZUL'], 
    [43, 'VERDE', 'AZUL', 'VERMELHO', 'VERMELHO'], 
    [44, 'AZUL', 'VERMELHO', 'VERDE', 'AMARELO'], 
    [45, 'AMARELO', 'AZUL', 'VERDE', 'VERMELHO']  
];

let currentProgramIndex = 0;
let idxPergunta = 1;
let tentRest = 1;
let pontuacao = 0;

function selectProgram(programIndex) {
    if (programIndex >= programs.length) return;
    
    currentProgramIndex = programIndex;
    idxPergunta = 1;
    tentRest = 1;
    pontuacao = 0;
    
    numCode.textContent = `0${programs[currentProgramIndex][0]}-> ${idxPergunta}`;
    numTentativas.textContent = `Tentativas ${tentRest} de 3`;
    
    document.querySelectorAll('.gabarito-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.gabarito-btn')[programIndex].classList.add('active');
    
    songNext.play();
}

document.querySelectorAll('.gabarito-btn').forEach((button, index) => {
    button.addEventListener('click', () => selectProgram(index));
});

function verificarResposta(resposta, programa, indice) {
    if (resposta === programa[indice]) {
        songRight.play();
        pontuacao += 4 - tentRest;
        console.log('+', 4 - tentRest, 'pts');
        return true;
    }
    songWrong.play(); // Ao mudar de programa ele toca o som de questão errada
    return false;
}

function atualizarEstado() {
    numTentativas.textContent = `Tentativas ${tentRest} de 3`;
    numCode.textContent = `0${programs[currentProgramIndex][0]}-> ${idxPergunta}`;
}

function proximoPrograma() {
    currentProgramIndex++;
    idxPergunta = 1;
    tentRest = 1;
    
    if (currentProgramIndex < programs.length) {
        console.log(`Mudando para lista ${currentProgramIndex + 1}`);
        songNext.play();
        atualizarEstado();
    } else {
        console.log("Acabaram as listas");
        numCode.textContent = `Pontuação: ${pontuacao}pts`;
        songNext.play();
    }
}

options.forEach(option => {
    option.addEventListener('click', ({ currentTarget }) => {
        const resposta = currentTarget.id;
        const programaAtual = programs[currentProgramIndex];
        
        if (!programaAtual || currentProgramIndex >= programs.length) return;

        if (verificarResposta(resposta, programaAtual, idxPergunta)) {
            idxPergunta++;
            tentRest = 1;
        } else if (tentRest < 3) {
            tentRest++;
        } else {
            tentRest = 1;
            idxPergunta++;
        }

        atualizarEstado();

        // Verifica conclusão do programa atual
        if (idxPergunta >= programaAtual.length) {
            proximoPrograma();
        }
    });
});

function reiniciar() {
    location.reload();
}