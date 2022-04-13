// Global Variables
let playerSum = 0;
let dealerSum = 0;
let dealerAces = 0;
let playerAces = 0;
let hidden;
let deck;
let canHit = true;


// Calling functions
buildDeck();
shuffleDeck();
startGame();


// Deck Creation
function buildDeck() {
    let suits = ['H', 'D', 'C', 'S'];
    let ranks = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++){
            // console.log(ranks[x] + suits[i])
            deck.push(ranks[j] + '-' + suits[i])
        }
    }
}


// Shuffle deck
function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length)
        let k = deck[i];
        deck[i] = deck[j];
        deck[j] = k;
    }
}


// Initializing game
function startGame() {
    hidden = deck.pop()
    dealerSum += getValue(hidden);
    dealerAces += checkAce(hidden);

    while (dealerSum < 17) {                     // Dealer's cards
        let card = deck.pop();
        dealerSum += getValue(card);
        dealerAces += checkAce(card);
        let cardImg = document.createElement("img");
        cardImg.src = './cards/' + card + '.png';
        document.getElementById('dealer-cards').append(cardImg);
    }

    for (let i = 0;i < 2; i++) {                 // Player's cards
        let card = deck.pop();
        playerSum += getValue(card);
        playerAces += checkAce(card);
        let cardImg = document.createElement("img");
        cardImg.src = './cards/' + card + '.png';
        document.getElementById('player-cards').append(cardImg);
    }
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}

function getValue(card) {
    let data = card.split('-');
    let value = data[0];

    if (isNaN(value)) {    // giving face cards a value
        if (value == 'A') {
            return 11;
        }
        return 10;
    }
    return parseInt(value)
}


// Hit function
function hit() {
    if (!canHit) {
        return;
    }

    let card = deck.pop();
    playerSum += getValue(card);
    playerAces += checkAce(card);
    let cardImg = document.createElement("img");
    cardImg.src = './cards/' + card + '.png';
    document.getElementById('player-cards').append(cardImg);

    if (reduceAce(playerSum, playerAces) > 21) {             // Stops hitting if sum with Ace over 21
        canHit = false;
    }
}

// Ace functions
function reduceAce(playerSum, playerAces) {
    while (playerSum > 21 && playerAces > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function checkAce(card) {
    if (card[0] == 'A') {
        return 1;
    }
    return 0;
}