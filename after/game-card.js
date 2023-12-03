import { CustomElemName } from "./constants.js";
export class GameCard extends HTMLElement {
  #isDisabled = false;

  constructor() {
    super();
  }

  connectedCallback() {
    this.classList.add("memory-card");
    this.dataset.name = this.getAttribute("name");

    const frontImg = document.createElement("img");
    frontImg.classList.add("front");
    frontImg.src = this.getAttribute("imagePath");

    const backImg = document.createElement("img");
    backImg.classList.add("back");
    backImg.src = "../img/question.svg";

    this.append(frontImg, backImg);
  }

  flip() {
    this.classList.toggle("flip");
  }

  get isDisabled() {
    return this.#isDisabled;
  }

  disable() {
    this.#isDisabled = true;
  }
}

customElements.define(CustomElemName.gameCard, GameCard);
