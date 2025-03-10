const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let cells = Array(9).fill(null);

function createBoard() {
    board.innerHTML = "";
    cells.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.innerText = value || "";
        cell.addEventListener("click", handleClick, { once: true });
        board.appendChild(cell);
    });
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (cells[index] || checkWinner()) return;

    cells[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.classList.add("taken");

    if (checkWinner()) {
        status.innerText = `Player ${currentPlayer} wins!`;
        return;
    }

    if (!cells.includes(null)) {
        status.innerText = "It's a draw!";
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.innerText = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
    });
}

function resetGame() {
    cells = Array(9).fill(null);
    currentPlayer = "X";
    status.innerText = "Player X's turn";
    createBoard();
}

createBoard();
