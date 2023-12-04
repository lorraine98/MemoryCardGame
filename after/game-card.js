import { CustomElemName } from "./constants.js";
export class GameCard extends HTMLElement {
  #isDisabled = false;

  connectedCallback() {
    this.classList.add("card");
    this.dataset.name = this.getAttribute("name");

    const frontImg = document.createElement("img");
    frontImg.classList.add("front");
    frontImg.src = this.getAttribute("imagePath");

    const backImg = document.createElement("img");
    backImg.classList.add("back");
    backImg.src = "../img/question.svg";

    this.append(frontImg, backImg);
  }

  get isDisabled() {
    return this.#isDisabled;
  }

  flip() {
    this.classList.toggle("flip");
  }

  disable() {
    this.#isDisabled = true;
  }
}

customElements.define(CustomElemName.gameCard, GameCard);
