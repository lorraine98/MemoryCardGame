const cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function onClickCard() {
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
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", onClickCard);
  secondCard.removeEventListener("click", onClickCard);

  resetSelections();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1200);
}

function resetSelections() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffleArray(arr) {
  arr.forEach((_, idx) => {
    const randomIdx = Math.floor(Math.random() * arr.length);
    [arr[randomIdx], arr[idx]] = [arr[idx], arr[randomIdx]];
  });
}

const orderList = [0, 1, 2, 3];

(function shuffle() {
  shuffleArray(orderList);
  cards.forEach((card, idx) => {
    card.style.order = orderList[idx];
  });
})();

cards.forEach((card) => card.addEventListener("click", onClickCard));
