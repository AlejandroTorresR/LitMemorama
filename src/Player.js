import { LitElement, css, html } from 'lit-element';

export class Player extends LitElement {
  static get styles() {
    return css`
      #player {
        border: solid 3px;
        width: 120px;
        height: 48px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        color: #fff;
        font-size: 20px;
        box-shadow: 0px 0px 3px #888888;
        background: #333;
        cursor: default;
        transition: all 1s;
      }
      #player.active {
        transition: all 1s;
        box-shadow: 0px 0px 15px #888888;
        background: #0A589E;
      }
      span {
        padding-left: 8px;
        padding-right: 8px;
      }
      span:first-child {
        border-right: 2px solid;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      active: { type: Boolean },
      score: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = 'Player';
    this.active = false;
    this.score = 0;
  }

  render() {
    return html`
      <div id="player" class="${this.active ? 'active' : ''}">
        <span>${this.name}</span>
        <span>${this.score}</span>
      </div>
    `;
  }
}
