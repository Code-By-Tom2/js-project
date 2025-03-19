const choices = document.querySelectorAll(".choice");
const resultDiv = document.getElementById("result");
const playerScoreSpan = document.getElementById("player-score");
const aiScoreSpan = document.getElementById("ai-score");

let playerScore = 0;
let aiScore = 0;

// AI makes a random choice
function getAIChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}


function getResult(playerChoice, aiChoice) {
  if (playerChoice === aiChoice) return "draw";
  if (
    (playerChoice === "rock" && aiChoice === "scissors") ||
    (playerChoice === "scissors" && aiChoice === "paper") ||
    (playerChoice === "paper" && aiChoice === "rock")
  ) {
    playerScore++;
    return "win";
  }
  aiScore++;
  return "lose";
}

// Handle choice clicks
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const playerChoice = choice.getAttribute("data-choice");
    const aiChoice = getAIChoice();
    const result = getResult(playerChoice, aiChoice);

    // Display the result
    resultDiv.innerHTML = `
      You chose <strong>${playerChoice}</strong>.
      AI chose <strong>${aiChoice}</strong>.
      You <strong>${result}</strong>!
    `;

    // Update the scores
    playerScoreSpan.textContent = playerScore;
    aiScoreSpan.textContent = aiScore;
  });
});
