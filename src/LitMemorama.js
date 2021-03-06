import { html, css, LitElement } from 'lit-element';
import './Card.js';

export class LitMemorama extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .table {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        align-content: center;
        justify-items: center;
        max-width: 700px;
        background: rgba(33, 150, 243, 0.8);
        padding: 16px;
        border: 5px solid #dadada;
        border-style: solid;
        margin: 16px auto;
        border-radius: 30px;
        overflow: auto;
      }
      button,
      select {
        width: 100px;
        height: 48px;
        padding: 8px;
        margin: 0 4px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        color: #fff;
        background: #0A589E;
        outline: none;
        text-transform: capitalize;
      }
      .container {
        max-width: 700px;
        margin: 0 auto;
        display: flex;
        flex-flow: row;
        justify-content: space-between;
      }
    `;
  }

  static get properties() {
    return {
      deck: {
        type: Array,
      },
      gameDifficulties: {
        type: Array,
      },
      gameDifficulty: {
        type: Number,
      },
      opened: {
        type: Array,
      },
      canMove: {
        type: Boolean,
      },
      turn: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
    this.gameDifficulties = ['easy', 'medium', 'hard'];
    this.icons = [
      '🌟',
      '🍒',
      '🍭',
      '🍰',
      '🍓',
      '🎨',
      '🚗',
      '🎀',
      '💖',
      '☠️',
      '👾',
      '🐶',
      '👻',
      '👑',
      '🙂',
    ];
    this._init();
  }

  firstUpdated() {
    this.shadowRoot.querySelector('#sel').addEventListener('change', () => {
      this.onChange();
    });
  }

  _init() {
    this.shuffle();
    this.canMove = true;
    this.opened = [];
    this.score = { 0: 0, 1: 0 };
    this.turn = 0;
    this.reset();
  }

  shuffle() {
    const icons = this.icons.slice(0, this.gameDifficulty);
    this.deck = icons.concat(icons).sort(() => Math.random() - 0.5);
  }

  onChange() {
    this.gameDifficulty =
      (Number(this.shadowRoot.querySelector('#sel').value) + 1) * 5;
    this._init();
  }

  _closeCards(event) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.opened[0].target.dispatchEvent(new Event(event));
        this.opened[1].target.dispatchEvent(new Event(event));
        this.opened = [];
        this.canMove = true;
        resolve();
      }, 1000);
    });
  }

  _played() {
    this.canMove = false;
    if (this.opened[0].icon === this.opened[1].icon) {
      this._closeCards('hide');
      this.score[this.turn % 2] += 1;
    } else {
      this._closeCards('open');
      this.turn += 1;
    }
  }

  _openCard(e) {
    if (this.canMove) {
      if (
        (this.opened.length > 0 &&
          this.opened.length < 2 &&
          this.opened[0].index !== e.target.index) ||
        !this.opened.length
      ) {
        e.target.dispatchEvent(new Event('open'));
        this.opened.push({
          icon: e.target.icon,
          index: e.target.index,
          target: e.target,
        });
      }
      if (this.opened.length === 2) {
        this._played();
      }
    }
  }

  reset() {
    const deck = this.shadowRoot.querySelectorAll('card-memorama');
    for (const d of deck) {
      d.dispatchEvent(new Event('reset'));
    }
  }

  render() {
    return html`
      <div class="container">
        <player-memorama
          name="P1"
          .active="${this.turn % 2 === 0}"
          score="${this.score[0]}"
        ></player-memorama>
        <player-memorama
          name="P2"
          .active="${this.turn % 2 === 1}"
          score="${this.score[1]}"
        ></player-memorama>
        <select id="sel" aria-label="sel">
          ${this.gameDifficulties.map(
            (opt, index) =>
              html`<option value="${index}" selected="${this.selected === opt}">
                ${opt}
              </option>`
          )}
        </select>
        <button @click="${this.reset}">Reset</button>
      </div>
      <div class="table">
        ${this.deck.map(
          (card, index) =>
            html`<card-memorama
              icon="${card}"
              index="${index}"
              @click="${this._openCard}"
            ></card-memorama>`
        )}
      </div>
    `;
  }
}
