import { LitElement, css, html } from 'lit-element';

export class Card extends LitElement {
    static get styles() {
      return css`
        :host {
          border-radius: 8px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 100px;
          height: 100px;
          font-size: 4rem;
          margin: 8px;
          cursor: pointer;
          background: #fff;
          box-shadow: 0px 0px 15px #888888;
        }
      `;
    }

    static get properties() {
      return {
        icon: { type: String }
      };
    }

    constructor() {
      super();
      this.icon = '❤️';
    }

    showIcon(){
      this.dispatchEvent(new CustomEvent('show-icon', { detail: this.icon }) );
    }

    render(){
        return html`
            <div @click="${this.showIcon}">${this.icon}</div>
        `;
    }
}