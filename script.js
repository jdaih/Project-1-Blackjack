// Global Variables
let suits = ['H', 'D', 'C', 'S'];
let ranks = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let deck = [];
let playerSum = 0;
let dealerSum = 0;
let dealerAces = 0;
let playerAces = 0;

let hidden;
let playerTurn = true;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Deck Creation
function buildDeck() {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++){
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
    hidden = deck.pop()                                       // Deck values still strings
    dealerSum += getValue(hidden);                            // getValue converts to numbers
    dealerAces += checkAce(hidden);

    while (dealerSum < 17) {                                  // Dealer's cards
        let card = deck.pop();                    
        dealerSum += getValue(card);                          // getValue also converts Face cards to 10
        dealerAces += checkAce(card);
        let cardImg = document.createElement("img");
        cardImg.src = './cards/' + card + '.png';
        document.getElementById('dealer-cards').append(cardImg);
    }

    for (let i = 0;i < 2; i++) {                              // Player's cards
        let card = deck.pop();
        playerSum += getValue(card);
        playerAces += checkAce(card);
        let cardImg = document.createElement("img");
        cardImg.src = './cards/' + card + '.png';
        document.getElementById('player-cards').append(cardImg);
    }
}

function getValue(card) {
    let data = card.split('-');               
    let value = data[0];
    if (isNaN(value)) {                         // Gives face cards a value 
        if (value == 'A') {
            return 11;
        }
        return 10;
    }
    return parseInt(value)                      // Converts deck strings into numbers
}


// Hit function
function hit() {
    if (!playerTurn) {
        return;
    }
    let card = deck.pop();
    playerSum += getValue(card);
    playerAces += checkAce(card);
    let cardImg = document.createElement("img");
    cardImg.src = './cards/' + card + '.png';
    document.getElementById('player-cards').append(cardImg);

    if (reduceAce(playerSum, playerAces) > 21) {             // Stops hitting if sum with Ace over 21
        playerTurn = false;
    }
    document.getElementById('player-sum').innerText = playerSum;
}

// Ace functions
function checkAce(card) {
    if (card[0] == 'A') {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAces) {
    if (playerSum > 21 && playerAces > 0) {
        playerSum -= 10;
        playerAces -= 1;
    }
    return playerSum;
}


// Stay function
function stay() {
    dealerSum = reduceAce(dealerSum, dealerAces);
    playerSum = reduceAce(playerSum, playerAces);
    playerTurn = false;

    let message = '';
    if (playerSum > 21) {
        message = 'Player busts!';
    }
    else if (dealerSum > 21) {
        message = 'Dealer busts!';
    }
    else if (playerSum = 10 && playerAces > 0) {
        message = "Blackjack!";
    }
    else if (playerSum == dealerSum) {
        message = 'Tie!';
    }
    else if (playerSum > dealerSum) {
        message = "Player Wins!";
    }
    else if (playerSum < dealerSum) {
        message = "Player Loses!";
    }

    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    document.getElementById('dealer-sum').innerHTML = dealerSum;
    document.getElementById('player-sum').innerHTML = playerSum;
    document.getElementById('outcome').innerHTML = message;
}

document.getElementById("hit").addEventListener("click", hit);
document.getElementById("stay").addEventListener("click", stay);


// Invoking functions
buildDeck();
shuffleDeck();
startGame();