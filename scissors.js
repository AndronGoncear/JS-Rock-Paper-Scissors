let score = {
  wins: 0,
  loses: 0,
  ties: 0,
};
let intervalId;
const storedScore = JSON.parse(localStorage.getItem("score"));

if (storedScore) {
  score = storedScore;
}
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  checkResult(computerMove, playerMove);
  if (result === "Tie!") {
    score.ties++;
  } else if (result === "You Win!") {
    score.wins++;
  } else if (result === "You Lose!") {
    score.loses++;
  }
  localStorage.setItem("score", JSON.stringify(score));
  updateResult();
  updateScoreElement();

  document.querySelector(".js-moves").innerHTML = `   You
    <img src="/images/${playerMove}-emoji.png" alt="" class="move-icons" />
    <img src="/images/${computerMove}-emoji.png" alt="" class="move-icons" />
    Computer`;
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("Rock");
});
document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("Paper");
});
document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("Scissors");
});

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissors";
  }
  return computerMove;
}

document.querySelector(".score-reset-button").addEventListener("click", () => {
  score.loses = 0;
  score.wins = 0;
  score.ties = 0;
  updateScoreElement();
  result = "";
  isStartGame = false;

  document.querySelector(".js-moves").innerHTML = "";
  updateResult();

  localStorage.removeItem("score");
});
function updateScoreElement() {
  document.querySelector(".js-score").innerHTML = `
  Score of the game: wins: ${score.wins}, loses: ${score.loses},ties: ${score.ties}`;
}
function updateResult() {
  document.querySelector(".js-result").innerHTML = result;
}
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("Rock");
  } else if (event.key === "p") {
    playGame("Paper");
  } else if (event.key === "s") {
    playGame("Scissors");
  }
});
let isStartGame = false;
function startGame() {
  if (!isStartGame) {
    intervalId = setInterval(() => {
      const computerMove = pickComputerMove();
      const playerMove = pickPlayerMove();
      checkResult(computerMove, playerMove);
      if (result === "Tie!") {
        score.ties++;
      } else if (result === "You Win!") {
        score.wins++;
      } else if (result === "You Lose!") {
        score.loses++;
      }
      localStorage.setItem("score", JSON.stringify(score));
      updateResult();
      updateScoreElement();

      document.querySelector(".js-moves").innerHTML = `   You
    <img src="/images/${playerMove}-emoji.png" alt="" class="move-icons" />
    <img src="/images/${computerMove}-emoji.png" alt="" class="move-icons" />
    Computer`;
    }, 1500);
    isStartGame = true;
  } else {
    clearInterval(intervalId);
    isStartGame = false;
  }
}

function pickPlayerMove() {
  const randomNumber = Math.random();
  let playerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    playerMove = "Rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    playerMove = "Paper";
  } else {
    playerMove = "Scissors";
  }
  return playerMove;
}
function stopGame() {
  clearInterval(intervalId);
  isStartGame = false;
}

function checkResult(computerMove, playerMove) {
  result = "";
  if (playerMove === "Scissors") {
    if (computerMove === "Scissors") {
      result = "Tie!";
    } else if (computerMove === "Rock") {
      result = "You Lose!";
    } else {
      result = "You Win!";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie!";
    } else if (computerMove === "Scissors") {
      result = "You Win!";
    } else {
      result = "You Lose!";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Paper") {
      result = "Tie!";
    } else if (computerMove === "Rock") {
      result = "You Win!";
    } else {
      result = "You Lose!";
    }
  }
  return result;
}
