
let selectedCards = [];
let moveCount = 0;

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

// moves counter
const moves = document.querySelector('.moves');

function addMove() {
    moveCount++;
    moves.textContent = moveCount;
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

// 
function newGame() {
    moveCount = 0;
    moves.textContent = 0;
    shuffleDeck();
}

newGame();

function shuffleDeck() {
    const deck = document.querySelector('.deck');
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCards(card);
    });

    deck.innerHTML = cardHTML.join('');
};


// flip card on click

document.querySelector('.deck').addEventListener('click', event => {
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
        }
    }
});

function flipCard(currentCard) {
    currentCard.classList.toggle('open');
    currentCard.classList.toggle('show');
}

function addCard(currentCard) {
    selectedCards.push(currentCard);
}

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
        }, 500);
    }
};


// if all cards match -> display modal

// create timer - start on first card click & stop when all cards are matched

// create move counter - add 1 move to counter for every 2 card clicks

// create star rating - starts with 3 stars, remove 1 star after 20 moves, remove 2 stars after 26 moves

// create restart button - resets timer, move counter, card classes, and shuffles cards