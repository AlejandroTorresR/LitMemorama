import { LitElement, css, html } from 'lit-element';

export class Player extends LitElement {
    static get styles() {
        return css`
        :host {
          border: solid 3px;
          width: 80px;
          height: 48px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          color: #fff;
          font-size: 20px;
          box-shadow: 0px 0px 15px #888888;
          background: rgba(33, 150, 243, .8);
          cursor: default;
        }
        `
    }

    static get properties() {
        return {
          name: { type: String },
          score: { type: Number }
        };
      }
  
    constructor() {
      super();
      this.name = 'Player';
      this.score = 0;
    }

    render(){
      return html`
          <div>
            <span>${this.name}</span>
            <span>${this.score}</span>
          </div>
      `;
    }
}