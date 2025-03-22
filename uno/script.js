// Initialize deck
let colors = ['red', 'green', 'blue', 'yellow'];
let deck = [];
for (let color of colors) {
    deck.push({color: color, value: 0});
    for (let num = 1; num <= 9; num++) {
        deck.push({color: color, value: num});
        deck.push({color: color, value: num});
    }
    for (let special of ['skip', 'reverse', 'draw2']) {
        deck.push({color: color, value: special});
        deck.push({color: color, value: special});
    }
}
for (let i = 0; i < 4; i++) {
    deck.push({color: 'wild', value: 'wild'});
    deck.push({color: 'wild', value: 'wild4'});
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(deck);

// Deal cards
let playerHands = [deck.splice(0, 7), deck.splice(0, 7)];
let discardPile = [];
let startingCard;
do {
    startingCard = deck.pop();
} while (typeof startingCard.value !== 'number'); // Ensure starting card is a number
discardPile.push(startingCard);
let currentColor = startingCard.color;
let currentPlayer = 0; // 0 = player, 1 = computer

// Create card element
function createCardElement(card) {
    let div = document.createElement('div');
    div.classList.add('card', card.color);
    div.textContent = card.value === 'draw2' ? '+2' :
                      card.value === 'wild4' ? '+4' :
                      card.value === 'skip' ? 'Skip' :
                      card.value === 'reverse' ? 'Rev' : card.value;
    return div;
}

// Render UI
function render() {
    document.getElementById('discard-pile').innerHTML = '';
    document.getElementById('discard-pile').appendChild(createCardElement(discardPile[discardPile.length - 1]));

    let playerHandDiv = document.getElementById('player-hand');
    playerHandDiv.innerHTML = '';
    for (let card of playerHands[0]) {
        let cardElem = createCardElement(card);
        cardElem.addEventListener('click', () => playCard(0, card));
        playerHandDiv.appendChild(cardElem);
    }

    document.getElementById('computer-hand').textContent = `Computer has ${playerHands[1].length} cards`;
    document.getElementById('message').textContent = `Current color: ${currentColor}. It's ${currentPlayer === 0 ? 'your' : 'computer\'s'} turn.`;
}

// Check if card is playable
function canPlay(card, topCard, currentColor) {
    if (card.color === 'wild') return true;
    if (topCard.color === 'wild') return card.color === currentColor;
    return card.color === topCard.color || card.value === topCard.value;
}

// Play a card
function playCard(playerIndex, card) {
    if (currentPlayer !== playerIndex) return;
    let topCard = discardPile[discardPile.length - 1];
    if (!canPlay(card, topCard, currentColor)) {
        document.getElementById('message').textContent = 'You can\'t play that card!';
        return;
    }
    playerHands[playerIndex] = playerHands[playerIndex].filter(c => c !== card);
    discardPile.push(card);

    if (card.value === 'wild' || card.value === 'wild4') {
        if (playerIndex === 0) {
            document.getElementById('color-chooser').style.display = 'block';
            document.querySelectorAll('#color-chooser button').forEach(btn => {
                btn.onclick = function() {
                    currentColor = this.textContent.toLowerCase();
                    document.getElementById('color-chooser').style.display = 'none';
                    finishPlay(playerIndex, card);
                };
            });
        } else {
            currentColor = chooseColor(playerHands[1]);
            finishPlay(playerIndex, card);
        }
    } else {
        currentColor = card.color;
        finishPlay(playerIndex, card);
    }
}

// Choose color for computer
function chooseColor(hand) {
    let colorCounts = {red: 0, green: 0, blue: 0, yellow: 0};
    for (let card of hand) {
        if (card.color in colorCounts) colorCounts[card.color]++;
    }
    return Object.keys(colorCounts).reduce((a, b) => colorCounts[a] > colorCounts[b] ? a : b);
}

// Finish play and apply effects
function finishPlay(playerIndex, card) {
    let nextPlayer = 1 - playerIndex;
    if (card.value === 'skip' || card.value === 'reverse') {
        // In 2-player, next player is skipped, current player goes again
    } else if (card.value === 'draw2') {
        playerHands[nextPlayer] = playerHands[nextPlayer].concat(deck.splice(0, 2));
    } else if (card.value === 'wild4') {
        playerHands[nextPlayer] = playerHands[nextPlayer].concat(deck.splice(0, 4));
    } else {
        currentPlayer = nextPlayer;
    }
    render();
    if (playerHands[playerIndex].length === 0) {
        document.getElementById('message').textContent = `${playerIndex === 0 ? 'You' : 'Computer'} win!`;
        return;
    }
    if (currentPlayer === 1) setTimeout(computerTurn, 1000);
}

// Computer’s turn
function computerTurn() {
    let topCard = discardPile[discardPile.length - 1];
    let playable = playerHands[1].filter(card => canPlay(card, topCard, currentColor));
    if (playable.length > 0) {
        playCard(1, playable[0]);
    } else if (deck.length > 0) {
        let drawnCard = deck.pop();
        playerHands[1].push(drawnCard);
        render();
        if (canPlay(drawnCard, topCard, currentColor)) {
            playCard(1, drawnCard);
        } else {
            currentPlayer = 0;
            render();
        }
    } else {
        currentPlayer = 0;
        render();
    }
}

// Event listeners
document.getElementById('draw-button').addEventListener('click', () => {
    if (currentPlayer !== 0 || deck.length === 0) return;
    let drawnCard = deck.pop();
    playerHands[0].push(drawnCard);
    render();
});

document.getElementById('pass-button').addEventListener('click', () => {
    if (currentPlayer === 0) {
        currentPlayer = 1;
        render();
        setTimeout(computerTurn, 1000);
    }
});

// Start game
render();