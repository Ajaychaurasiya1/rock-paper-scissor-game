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

  // Remove any old animation classes
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

    // ✨ Add bubbling animation to user's circle
    userPickEl.classList.add("winner");

  } else {
    resultMessage.textContent = "YOU LOSE";
    computerScore++;
    nextBtn.style.display = "none";

    // ✨ Add bubbling animation to computer's circle
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
});

document.getElementById("playAgainHurray").addEventListener("click", () => {
  hurrayScreen.style.display = "none";
  game.style.display = "block";
});

nextBtn.addEventListener("click", () => {
  resultScreen.style.display = "none";
  hurrayScreen.style.display = "flex";
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



// ====== SELECT ELEMENTS ======
const userScoreEl = document.querySelector('.score1 span');
const computerScoreEl = document.querySelector('.score2 span');

// ====== INITIALIZE SCORES ======
let userScore = 0;
let computerScore = 0;

// ====== LOAD SAVED SCORES FROM LOCAL STORAGE ======
function loadScores() {
  const savedUserScore = localStorage.getItem('userScore');
  const savedComputerScore = localStorage.getItem('computerScore');

  if (savedUserScore !== null) {
    userScore = parseInt(savedUserScore);
  }
  if (savedComputerScore !== null) {
    computerScore = parseInt(savedComputerScore);
  }

  updateScoreDisplay();
}

// ====== UPDATE SCORE DISPLAY ======
function updateScoreDisplay() {
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
}

// ====== SAVE SCORES TO LOCAL STORAGE ======
function saveScores() {
  localStorage.setItem('userScore', userScore);
  localStorage.setItem('computerScore', computerScore);
}

// ====== RESET SCORES (Optional Button) ======
function resetScores() {
  userScore = 0;
  computerScore = 0;
  saveScores();
  updateScoreDisplay();
}

// ====== EXAMPLE GAME LOGIC ======
function playRound(userChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'scissors' && computerChoice === 'paper') ||
    (userChoice === 'paper' && computerChoice === 'rock')
  ) {
    userScore++;
  } else if (userChoice !== computerChoice) {
    computerScore++;
  }

  saveScores(); // save after each round
  updateScoreDisplay();

  console.log(`You: ${userChoice}, PC: ${computerChoice}`);
}

// ====== RUN ON PAGE LOAD ======
window.addEventListener('DOMContentLoaded', loadScores);
