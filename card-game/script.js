document.addEventListener('DOMContentLoaded', () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const values = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': 11};

    let deck = [];
    let playerHand = [];
    let dealerHand = [];

    // DOM elements
    const dealerCards = document.getElementById('dealer-cards');
    const dealerScore = document.getElementById('dealer-score');
    const playerCards = document.getElementById('player-cards');
    const playerScore = document.getElementById('player-score');
    const hitButton = document.getElementById('hit-button');
    const standButton = document.getElementById('stand-button');
    const newGameButton = document.getElementById('new-game-button');
    const message = document.getElementById('message');

    // Create a deck of 52 cards
    function createDeck() {
        deck = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push({ suit, rank, value: values[rank] });
            }
        }
    }

    // Shuffle the deck using Fisher-Yates algorithm
    function shuffleDeck() {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    // Calculate hand value, adjusting Aces as needed
    function calculateHand(hand) {
        let total = 0;
        let aces = 0;
        for (const card of hand) {
            total += card.value;
            if (card.rank === 'A') aces++;
        }
        while (total > 21 && aces > 0) {
            total -= 10; // Convert an Ace from 11 to 1
            aces--;
        }
        return total;
    }

    // Create a card element for display
    function createCardElement(card, hidden = false) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        const color = (card.suit === 'hearts' || card.suit === 'diamonds') ? 'red' : 'black';

        if (hidden) {
            cardDiv.textContent = '?';
            cardDiv.style.backgroundColor = '#ccc';
            cardDiv.style.textAlign = 'center';
            cardDiv.style.fontSize = '50px';
            cardDiv.style.lineHeight = '150px';
        } else {
            const topLeft = document.createElement('div');
            topLeft.classList.add('top-left');
            topLeft.style.color = color;
            topLeft.innerHTML = `${card.rank}${getSuitSymbol(card.suit)}`;

            const bottomRight = document.createElement('div');
            bottomRight.classList.add('bottom-right');
            bottomRight.style.color = color;
            bottomRight.innerHTML = `${card.rank}${getSuitSymbol(card.suit)}`;

            cardDiv.appendChild(topLeft);
            cardDiv.appendChild(bottomRight);
        }
        return cardDiv;
    }

    // Get suit symbol as Unicode character
    function getSuitSymbol(suit) {
        switch (suit) {
            case 'hearts': return '♥';
            case 'diamonds': return '♦';
            case 'clubs': return '♣';
            case 'spades': return '♠';
        }
    }

    // Start a new game
    function startGame() {
        createDeck();
        shuffleDeck();
        playerHand = [deck.pop(), deck.pop()];
        dealerHand = [deck.pop(), deck.pop()];

        dealerCards.innerHTML = '';
        dealerCards.appendChild(createCardElement(dealerHand[0]));
        dealerCards.appendChild(createCardElement(dealerHand[1], true)); // Second card hidden
        dealerScore.textContent = 'Score: ?';

        playerCards.innerHTML = '';
        playerHand.forEach(card => playerCards.appendChild(createCardElement(card)));
        playerScore.textContent = `Score: ${calculateHand(playerHand)}`;

        hitButton.disabled = false;
        standButton.disabled = false;
        newGameButton.disabled = true;
        message.textContent = 'Your turn: Hit or Stand';
    }

    // Player hits (draws a card)
    hitButton.addEventListener('click', () => {
        playerHand.push(deck.pop());
        playerCards.appendChild(createCardElement(playerHand[playerHand.length - 1]));
        const score = calculateHand(playerHand);
        playerScore.textContent = `Score: ${score}`;

        if (score > 21) {
            endGame('Player busts! Dealer wins.');
        }
    });

    // Player stands (dealer's turn)
    standButton.addEventListener('click', () => {
        hitButton.disabled = true;
        standButton.disabled = true;

        // Reveal dealer's hidden card
        dealerCards.innerHTML = '';
        dealerHand.forEach(card => dealerCards.appendChild(createCardElement(card)));
        let dealerTotal = calculateHand(dealerHand);
        dealerScore.textContent = `Score: ${dealerTotal}`;

        // Dealer draws until score is at least 17
        while (dealerTotal < 17 && deck.length > 0) {
            dealerHand.push(deck.pop());
            dealerCards.appendChild(createCardElement(dealerHand[dealerHand.length - 1]));
            dealerTotal = calculateHand(dealerHand);
            dealerScore.textContent = `Score: ${dealerTotal}`;
        }

        const playerTotal = calculateHand(playerHand);
        if (dealerTotal > 21) {
            endGame('Dealer busts! Player wins!');
        } else if (dealerTotal > playerTotal) {
            endGame('Dealer wins!');
        } else if (playerTotal > dealerTotal) {
            endGame('Player wins!');
        } else {
            endGame('It\'s a tie!');
        }
    });

    function endGame(result) {
        hitButton.disabled = true;
        standButton.disabled = true;
        newGameButton.disabled = false;
        message.textContent = result;
    }

    newGameButton.addEventListener('click', startGame);

    startGame();
});