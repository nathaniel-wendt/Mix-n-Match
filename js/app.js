const timer = document.querySelector('.timer');
const moves = document.querySelector('.moves');
const deck = document.querySelector('.deck');
const restart = document.querySelector('.restart');
const button = document.querySelector('.button');
const modal = document.querySelector('.modal');
const cards = [
    "fa-diamond", "fa-diamond",
    "fa-bomb", "fa-bomb",
    "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-anchor", "fa-anchor",
    "fa-leaf", "fa-leaf",
    "fa-cube", "fa-cube",
    "fa-bicycle", "fa-bicycle",
    "fa-bolt", "fa-bolt",
  ];

let selectedCards = [];
let moveCount = 0;
let minutes = 0;
let seconds = 0;
let time;
let timerOn = false;

function addMove() {
    moveCount++;
    if (moveCount === 1) {
        moves.textContent = moveCount + " Move";
    } else {
        moves.textContent = moveCount + " Moves";
    }
}

function startTimer() {
    time = setInterval(() => {
    seconds++;
    timer.textContent = `${minutes} : ${seconds}`;
    if (seconds < 10) {
        timer.textContent = `${minutes} : 0${seconds}`;
    }
        if (seconds === 59) {
            minutes++;
            seconds = 0;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(time);
}

function resetTimer() {
    clearInterval(time);
    minutes = 0;
    seconds = 0;
    timerOn = false;
    deck.removeEventListener('click', checkTimer);
}

function checkTimer() {
    if (!timerOn) {
        startTimer();
        timerOn = true;
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Programatically generates card HTML
function generateCards(card) {
    return `<li class="card"><i class="fa ${card}"></i> </li>`;
}

function shuffleDeck() {
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCards(card);
    });

    deck.innerHTML = cardHTML.join('');
}

// Flip eligible cards (2 max), add them to selectedCards Array, & check for match
deck.addEventListener('click', event => {
    const currentCard = event.target;
    if (currentCard.classList.contains('card') &&
        !selectedCards.includes(currentCard) &&
        selectedCards.length < 2 &&
        !currentCard.classList.contains('match')) {
            flipCard(currentCard);
            addCard(currentCard);
        if (selectedCards.length === 2) {
            checkForMatch();
            addMove();
            checkStarScore();
        }
    }   checkGameWon();
});

// Toggle 'open' & 'show' CSS classes to simulate card flip
function flipCard(currentCard) {
    currentCard.classList.toggle('open');
    currentCard.classList.toggle('show');
}

// Add card to selectedCards Array for match comparison
function addCard(currentCard) {
    selectedCards.push(currentCard);
}

// If cards match, toggle 'match' CSS class & empty selectedCards Array, else flip cards & empty Array after delay
function checkForMatch() {
    if (selectedCards[0].firstElementChild.className === selectedCards[1].firstElementChild.className) {
        selectedCards[0].classList.toggle('match');
        selectedCards[1].classList.toggle('match');
        selectedCards = [];
    } else {
        setTimeout(() => {
            flipCard(selectedCards[0]);
            flipCard(selectedCards[1]);
            selectedCards = [];
        }, 1000);
    }
}

function checkStarScore() {
    const starList = document.querySelectorAll('.stars li');
    if (moveCount > 20) {
        starList[3].innerHTML = '<i class="fa fa-star-o"></i>';
    } else if (moveCount > 17) {
        starList[2].innerHTML = '<i class="fa fa-star-o"></i>';
    } else if (moveCount > 14) {
        starList[1].innerHTML = '<i class="fa fa-star-o"></i>';
    } else if (moveCount > 11) {
        starList[0].innerHTML = '<i class="fa fa-star-o"></i>';
    } else {
        starList[0].innerHTML = '<i class="fa fa-star"></i>';
        starList[1].innerHTML = '<i class="fa fa-star"></i>';
        starList[2].innerHTML = '<i class="fa fa-star"></i>';
        starList[3].innerHTML = '<i class="fa fa-star"></i>';
    }
}

function checkGameWon() {
    const matchList = document.querySelectorAll('li.match').length;
    if (matchList === 16) {
        stopTimer();
        displayModal();
    }
}

function displayModal() {
    const message = document.querySelector('.modal-message');
    const starScore = document.querySelectorAll('.fa-star').length;
    const displayScore = document.querySelector('.modal-score');
    modal.classList.remove('hidden');
    message.textContent = `You finished in ${minutes}:${seconds} using only ${moveCount} moves!`;
    displayScore.textContent = `${starScore} out of 5 Star performance!`;
}

function hideModal() {
    modal.classList.add('hidden');
}

function newGame() {
    moveCount = 0;
    moves.textContent = 0 + " Moves";
    timer.textContent = "- : --";
    shuffleDeck();
    checkStarScore();
    resetTimer();
    hideModal();
    deck.addEventListener('click', checkTimer);
    restart.addEventListener('click', newGame);
    button.addEventListener('click', newGame);
}
newGame();