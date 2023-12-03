const board = document.querySelector(".memory-game");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
const level = {
  easy: 4,
  medium: 8,
  hard: 12,
};
let currentLevel = level.easy;

function createCards(cards) {
  for (const card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("memory-card");
    cardElement.setAttribute("data-asset", card.name);
    cardElement.innerHTML = `
          <img class="front" src=${card.image} />
          <img class="back" src="../img/question.svg" />
      `;
    board.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}
function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  hasFlippedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.asset === secondCard.dataset.asset;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1200);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleArray(arr) {
  arr.forEach((_, idx) => {
    const randomIdx = Math.floor(Math.random() * arr.length);
    [arr[randomIdx], arr[idx]] = [arr[idx], arr[randomIdx]];
  });
}

async function fetchCards(count) {
  const response = await fetch("./cardData.json");
  const cards = await response.json();
  return cards.slice(0, count);
}

function gameStart() {
  const cards = fetchCards(currentLevel);
  shuffleArray(cards);
  createCards(cards);
}

gameStart();
