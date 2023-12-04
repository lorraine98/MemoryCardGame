import { shuffleArray } from "./utils.js";
import { CustomElemName } from "./constants.js";

export class GameBoard extends HTMLElement {
  #cards = [];
  #level = {
    easy: 2,
    medium: 4,
    hard: 6,
  };

  #lock = false;

  #firstCard = null;
  #secondCard = null;

  async connectedCallback() {
    console.log("gameBoard is connected...");
    const cardInfoList = await this.#fetchCardInfoList(this.#level.hard);
    this.classList.add("board");
    this.#cards = this.#createCards(cardInfoList);
    shuffleArray(this.#cards);
    this.append(...this.#cards);
    this.#bindEvents();
  }

  #bindEvents() {
    this.addEventListener("click", (event) => {
      const gameCard = event.target?.closest(CustomElemName.gameCard);
      if (!gameCard) {
        return;
      }
      this.#onClickCard(gameCard);
    });
  }

  #onClickCard(gameCard) {
    if (this.#lock) {
      return;
    }

    if (this.#firstCard === gameCard) {
      return;
    }

    if (gameCard.isDisabled) {
      return;
    }

    this.#lock = true;
    gameCard.flip();

    if (!this.#firstCard) {
      this.#firstCard = gameCard;
      this.#lock = false;
      return;
    }

    this.#secondCard = gameCard;
    this.#checkForMatch();
  }

  #resetSelections() {
    this.#firstCard = null;
    this.#secondCard = null;
    this.#lock = false;
  }

  #checkForMatch() {
    const isMatch =
      this.#firstCard.dataset.name === this.#secondCard.dataset.name;

    if (isMatch) {
      this.#firstCard.disable();
      this.#secondCard.disable();

      this.#resetSelections();
      return;
    }

    setTimeout(() => {
      this.#firstCard.flip();
      this.#secondCard.flip();
      this.#resetSelections();
    }, 1200);
  }

  #createCards(cardInfoList) {
    const cardList = [...cardInfoList, ...cardInfoList].map((cardInfo) => {
      const card = document.createElement(CustomElemName.gameCard);
      card.setAttribute("imagePath", cardInfo.imagePath);
      card.setAttribute("name", cardInfo.name);
      return card;
    });
    return cardList;
  }

  async #fetchCardInfoList(count) {
    const response = await fetch("./cardData.json");
    const cards = await response.json();
    return cards.slice(0, count);
  }
}

customElements.define(CustomElemName.gameBoard, GameBoard);
