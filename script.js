const board = document.getElementById("gameBoard");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restartBtn");

const emojiList = ['🍎', '🍌', '🍇', '🍒', '🍉', '🥝', '🍋', '🍓'];

let allCards = [];
let flipped = [];
let matched = 0;
let moveCount = 0;
let time = 0;
let timerId = null;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
  timerId = setInterval(() => {
    time++;
    timerDisplay.textContent = `${time}s`;
  }, 1000);
}

function resetGame() {
  board.innerHTML = "";
  flipped = [];
  matched = 0;
  moveCount = 0;
  time = 0;

  movesDisplay.textContent = moveCount;
  timerDisplay.textContent = "0s";
  clearInterval(timerId);

  allCards = shuffle([...emojiList, ...emojiList]);

  allCards.forEach(symbol => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.symbol = symbol;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${symbol}</div>
        <div class="card-back">?</div>
      </div>
    `;

    card.addEventListener("click", handleFlip);
    board.appendChild(card);
  });
}

function handleFlip(e) {
  const card = e.currentTarget;

  if (
    card.classList.contains("flipped") ||
    card.classList.contains("matched") ||
    flipped.length === 2
  ) {
    return;
  }

  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 1 && time === 0) {
    startTimer();
  }

  if (flipped.length === 2) {
    moveCount++;
    movesDisplay.textContent = moveCount;

    const [firstCard, secondCard] = flipped;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matched++;

      flipped = [];

      if (matched === emojiList.length) {
        clearInterval(timerId);
        setTimeout(() => {
          alert(`🎉 You won in ${moveCount} moves and ${time}s!`);
        }, 400);
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        flipped = [];
      }, 1000);
    }
  }
}

restartButton.addEventListener("click", resetGame);

resetGame();
