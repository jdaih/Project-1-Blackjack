// Global Variables
let playerSum = 0;
let dealerSum = 0;
let dAces = 0;
let pAces = 0;

let hidden;
let deck;

let canHit = true;

// Calling functions
buildDeck()
shuffleDeck()

// Deck Creation
function buildDeck() {
    let suits = ['H', 'D', 'C', 'S'];
    let ranks = ['A','2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++){
            // console.log(ranks[x] + suits[i])
            deck.push(ranks[j] + suits[i])
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

