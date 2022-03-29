window.addEventListener('load', init);

// Níveis
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

// Mudar nível
const currentLevel = levels.easy;

// Variáveis globais que serão usadas nas funções
let time = currentLevel;
let score = 0;
let isPlaying;

// ELEMENTOS DOM (HTML)
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

// Array das palavras
const words = [
  'gato',
  'cachorro',
  'pato',
  'marreco',
  'enciclopédia',
  'lacraia',
  'pesadelo',
  'pseudônimo',
  'investigar',
  'estragar',
  'endividamento'
];

// Inicializar jogo
function init() {
  // Mostrar os números dos segundos de cada nível no HTML
  seconds.innerHTML = currentLevel;
// Carregar palavras do array
showWord(words);
// Começar a colocar as palavras no input
wordInput.addEventListener('input', startMatch);
// Chama a contagem regressiva
setInterval(countdown, 1000);
// Checar o status do jogo
setInterval(checkStatus, 50);
};

// Começar a partida
function startMatch() {
  if(matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  } 
  // se score for -1 mostra 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
  scoreDisplay.innerHTML = score;
  }
};

// Comparar as palavras
function matchWords() {
  if(wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'A palavra está correta!';
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }

};

function showWord(words) {
  // Cria palavras do array randomicamente
  const randIndex = Math.floor(Math.random() * words.length);
  // mostra a palavra random
  currentWord.innerHTML = words[randIndex];

};

// Função contagem regressiva
function countdown() {
  // checar se o tempo acabou
  if(time > 0) {
    // Decrementa
    time--;
  } else if(time === 0) {
    // Game over
    isPlaying = false;
  }
  // Mostra o tempo
  timeDisplay.innerHTML = time;

}

// Checar status do jogo
function checkStatus() {
  if(!isPlaying && time === 0) {
    message.innerHTML = 'Game over';
    score = -1;
  }
}