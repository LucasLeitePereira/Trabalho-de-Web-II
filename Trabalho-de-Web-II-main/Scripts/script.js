const opcoes = document.querySelector('.buttons');
const botoes = opcoes.querySelectorAll('button');

const numTentativas = document.getElementById('numTentativas');
const numCodigo = document.getElementById('numCode');

const somCerto = document.getElementById('songRight');
const somErrado = document.getElementById('songWrong');
const somProximo = document.getElementById('songNext');

const programas = [
    [41, 'VERMELHO', 'VERDE', 'AZUL','VERDE','VERDE',
            'VERMELHO','VERMELHO','VERDE','AZUL','AMARELO',
            'AMARELO','AZUL','VERDE','VERDE','AMARELO',
            'VERDE','AMARELO','VERDE','VERMELHO','VERDE',
            'VERMELHO','AMARELO','VERDE','VERMELHO','AZUL',
            'VERMELHO','AZUL','AZUL','AMARELO','VERDE' ],
    [42, 'VERMELHO', 'VERDE', 'VERDE', 'AZUL'],
    [43, 'VERDE', 'AZUL', 'VERMELHO', 'VERMELHO'],
    [44, 'AZUL', 'VERMELHO', 'VERDE', 'AMARELO'],
    [45, 'AMARELO', 'AZUL', 'VERDE', 'VERMELHO']
];

let indiceProgramaAtual = 0;
let indicePergunta = 1;
let tentativasRestantes = 1;
let pontuacao = 0;

function selecionarPrograma(indicePrograma) {
    if (indicePrograma >= programas.length) return;
    
    indiceProgramaAtual = indicePrograma;
    indicePergunta = 1;
    tentativasRestantes = 1;
    pontuacao = 0;
    
    numCodigo.textContent = `0${programas[indiceProgramaAtual][0]}-> ${indicePergunta}`;
    numTentativas.textContent = `Tentativas ${tentativasRestantes} de 3`;
    
    document.querySelectorAll('.gabarito-btn').forEach(botao => {
        botao.classList.remove('active');
    });
    document.querySelectorAll('.gabarito-btn')[indicePrograma].classList.add('active');
    
    somProximo.play();
}

document.querySelectorAll('.gabarito-btn').forEach((botao, indice) => {
    botao.addEventListener('click', () => selecionarPrograma(indice));
});

function verificarResposta(resposta, programa, indice) {
    if (resposta === programa[indice]) {
        somCerto.play();
        pontuacao += 4 - tentativasRestantes;
        console.log('+', 4 - tentativasRestantes, 'pts');
        return true;
    }
    somErrado.play(); // Toca o som de resposta errada ao mudar de programa
    return false;
}

function atualizarEstado() {
    numTentativas.textContent = `Tentativas ${tentativasRestantes} de 3`;
    numCodigo.textContent = `0${programas[indiceProgramaAtual][0]}-> ${indicePergunta}`;
}

function proximoPrograma() {
    indiceProgramaAtual++;
    indicePergunta = 1;
    tentativasRestantes = 1;
    
    if (indiceProgramaAtual < programas.length) {
        numCodigo.textContent = `Pontuação: ${pontuacao}pts`;
        somProximo.play();
        setTimeout(() => {
            atualizarEstado();
        }, 2000)
    } else {
        console.log("Acabaram as listas");
        numCodigo.textContent = `Pontuação: ${pontuacao}pts`;
        somProximo.play();
    }
}

botoes.forEach(botao => {
    botao.addEventListener('click', ({ currentTarget }) => {
        const resposta = currentTarget.id;
        const programaAtual = programas[indiceProgramaAtual];
        
        if (!programaAtual || indiceProgramaAtual >= programas.length) return;

        if (verificarResposta(resposta, programaAtual, indicePergunta)) {
            indicePergunta++;
            tentativasRestantes = 1;
        } else if (tentativasRestantes < 3) {
            tentativasRestantes++;
        } else {
            tentativasRestantes = 1;
            indicePergunta++;
        }

        atualizarEstado();

        // Verifica conclusão do programa atual
        if (indicePergunta >= programaAtual.length) {
            proximoPrograma();
        }
    });
});

function reiniciar() {
    location.reload();
}