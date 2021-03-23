import { html, css, LitElement } from 'lit-element';
import './Card.js';

export class LitMemorama extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
      .table {
        max-height: 640px;
        max-width: 700px;
        background: rgba(33, 150, 243, .8);
        padding: 16px;
        display: flex;
        flex-flow: wrap;
        justify-content: center;
        border: 5px white;
        border-style: solid;
        margin: 0 auto;
        border-radius: 30px;
        box-shadow: rgb(0 188 212 / 30%) 10px 10px 31px -11px;
        overflow: auto;
      }
      select{
        width: 100px;
        height: 48px;
        padding: 8px;
        border-radius: 8px;
        cursor: pointer;
      }
    `;
  }

  static get properties() {
    return {
      deck: {
        type: Array,
        value: [],
      },
      gameDifficulties: {
        type: Array,
        value: []
      },
      gameDifficulty: {
        type: Number,
        value: 0
      }
    };
  }

  constructor() {
    super();
    this.gameDifficulties = ['easy', 'medium', 'hard'];
    this.icons = ['🌟','🍒','🍭','🍰','🍓','🎨','🚗','🎀','💖','☠️','👾','🐶','👻','👑','🙂'];
    this._initGame();
  }

  firstUpdated(){

  }

  _initGame() {
    this.shuffle();
    this.turn = 1;
    this.isOver = false;
    this.canMove = true;
    this.score = { 1: 0, 2: 0 };
    this.opened = [];
  }

  shuffle() {
    const icons = this.icons.slice(0, this.gameDifficulty);
    this.deck = icons.concat(icons).sort(() => Math.random() - 0.5);
  }

  onChange(){
    this.gameDifficulty = (Number(this.shadowRoot.querySelector('#sel').value) + 1) * 5;
    this._initGame();
  }

  _openCard(e) {
    console.log(e.detail)
  }

  render() {
    return html`
      <player-memorama name="P1"></player-memorama>
      <player-memorama name="P2"></player-memorama>
      <select id="sel" @change="${this.onChange}">
        ${this.gameDifficulties.map( (opt, index) => html`<option value="${index}" selected="${this.selected === opt}">${opt}</option>` )}
      </select>
      <div class="table">
        ${this.deck.map( card => html`<card-memorama icon="${card}" @show-icon="${this._openCard}"></card-memorama>` )}
      </div>
    `;
  }
}
