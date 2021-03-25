import { LitElement, css, html } from 'lit-element';

export class Card extends LitElement {
  static get styles() {
    return css`
      #card {
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
      .transparent {
        opacity: 0;
      }
      #card.hide {
        display: none;
      }
    `;
  }

  static get properties() {
    return {
      icon: {
        type: String,
      },
      index: {
        type: Number,
      },
      open: {
        type: Boolean,
      },
      hide: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.icon = '❤️';
    this.index = '';
    this.open = false;
    this.hide = false;
  }

  firstUpdated() {
    this.addEventListener('hide', () => {
      this.hide = true;
    });
    this.addEventListener('open', () => {
      this.open = !this.open;
    });
    this.addEventListener('reset', () => {
      this.hide = false;
      this.open = false;
    });
  }

  render() {
    return html`
      <div id="card" class="${this.hide ? 'hide' : ''}">
        <span class="${this.open ? '' : 'transparent'}">${this.icon}</span>
      </div>
    `;
  }
}
