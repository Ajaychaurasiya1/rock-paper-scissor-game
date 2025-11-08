const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const game = document.getElementById("game");
const resultScreen = document.getElementById("resultScreen");
const hurrayScreen = document.getElementById("hurrayScreen");
const userPickEl = document.getElementById("userPick");
const computerPickEl = document.getElementById("computerPick");
const resultMessage = document.getElementById("resultMessage");
const nextBtn = document.getElementById("nextBtn");

let userScore = parseInt(localStorage.getItem("userScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

userScoreEl.textContent = userScore;
computerScoreEl.textContent = computerScore;

document.querySelectorAll(".circle").forEach(button => {
  button.addEventListener("click", () => {
    const userChoice = button.getAttribute("data-choice");
    const computerChoice = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
    showResult(userChoice, computerChoice);
  });
});

function showResult(userChoice, computerChoice) {
  game.style.display = "none";
  resultScreen.style.display = "flex";

  const icons = { rock: "✊", paper: "✋", scissors: "✌️" };

  userPickEl.innerHTML = icons[userChoice];
  computerPickEl.innerHTML = icons[computerChoice];

 
  userPickEl.classList.remove("winner");
  computerPickEl.classList.remove("winner");

  const wins = { rock: "scissors", paper: "rock", scissors: "paper" };

  if (userChoice === computerChoice) {
    resultMessage.textContent = "TIE UP";
    nextBtn.style.display = "none";
  } else if (wins[userChoice] === computerChoice) {
    resultMessage.textContent = "YOU WIN";
    userScore++;
    nextBtn.style.display = "inline-block";

  
    userPickEl.classList.add("winner");

  } else {
    resultMessage.textContent = "YOU LOSE";
    computerScore++;
    nextBtn.style.display = "none";

    
    computerPickEl.classList.add("winner");
  }

  updateScores();
}


function updateScores() {
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
}

document.getElementById("playAgain").addEventListener("click", () => {
  resultScreen.style.display = "none";
  game.style.display = "block";
  nextBtn.style.display = "none";
});

document.getElementById("playAgainHurray").addEventListener("click", () => {
  hurrayScreen.style.display = "none";
  game.style.display = "block";
  nextBtn.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  resultScreen.style.display = "none";
  hurrayScreen.style.display = "flex";
  nextBtn.style.display = "none";
});

const rulesBtn = document.getElementById("rulesBtn");
const rulesPopup = document.getElementById("rulesPopup");
const closeRules = document.getElementById("closeRules");

rulesBtn.addEventListener("click", () => {
  rulesPopup.style.display = "block";
});

closeRules.addEventListener("click", () => {
  rulesPopup.style.display = "none";
});



