let cards = [];
let flippedCards = [];
let matchedCards = 0;
let moves = 0;
let timer;
let time = 0;
let difficulty = 4; // Default difficulty (4x4 grid)

const restartBtn = document.getElementById('restart-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const difficultySelect = document.getElementById('difficulty');
const gameBoard = document.getElementById('game-board');
difficultySelect.addEventListener('change', (e) => {
    difficulty = parseInt(e.target.value);
    resetGame();
});

// Restart the game
restartBtn.addEventListener('click', resetGame);

// Card data generator based on difficulty level
function generateCards() {
    cards = [];
    const totalCards = difficulty * difficulty / 2; // Half the number of cards (pairs)

    for (let i = 1; i <= totalCards; i++) {
        cards.push({ value: i, id: `card${i}a` });
        cards.push({ value: i, id: `card${i}b` });
    }

    shuffle(cards);
}

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Create the game board based on difficulty
function createBoard() {
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${difficulty}, 100px)`;
    gameBoard.style.gridTemplateRows = `repeat(${difficulty}, 100px)`;

    cards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id;
        cardElement.dataset.value = card.value;

        const innerDiv = document.createElement('div');
        innerDiv.classList.add('inner');
        cardElement.appendChild(innerDiv);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    matchedCards = 0;
    moves = 0;
    updateScore();
    resetTimer();
}

// Flip the card when clicked
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        updateScore();
        checkMatch();
    }
}

// Check if the two flipped cards match
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards += 2;

        if (matchedCards === cards.length) {
            clearInterval(timer);
            setTimeout(() => alert(`You win! Moves: ${moves} Time: ${time} seconds`), 500);
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

// Update the score
function updateScore() {
    scoreElement.textContent = `Moves: ${moves}`;
}

// Start or reset the timer
function startTimer() {
    timer = setInterval(() => {
        time++;
        timerElement.textContent = `Time: ${time}s`;
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    time = 0;
    timerElement.textContent = `Time: 0s`;
    startTimer();
}

// Reset the game (shuffle cards, reset score, timer)
function resetGame() {
    generateCards();
    createBoard();
}

// Start the game
resetGame();
