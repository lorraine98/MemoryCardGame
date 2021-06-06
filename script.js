const cards = document.querySelectorAll('.memory-card');

let hasFilpedCard = false;
let firstCard, secondCard;

function filpCard() {
    this.classList.add('flip')
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
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

    isMatch ? disableCards() : unflippCards();
}

function disableCards() {
    firstCard.removeEventListener('click', filpCard);
    secondCard.removeEventListener('click', filpCard);
}

function unflippCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1200);
}
cards.forEach(card => card.addEventListener('click', filpCard))