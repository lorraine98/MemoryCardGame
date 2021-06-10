const cards = document.querySelectorAll(".memory-card");

let hasFilpedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function filpCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add("flip");
  if (!hasFilpedCard) {
    hasFilpedCard = true;
    firstCard = this;

    return;
  }
  hasFilpedCard = false;
  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflippCards();
}

function disableCards() {
  firstCard.removeEventListener("click", filpCard);
  secondCard.removeEventListener("click", filpCard);

  resetBorad();
}

function unflippCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    lockBoard = false;
  }, 1200);
}

function resetBorad() {
  [hasFilpedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

cards.forEach((card) => card.addEventListener("click", filpCard));
