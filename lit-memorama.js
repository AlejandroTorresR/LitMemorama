import { LitMemorama } from './src/LitMemorama.js';
import { Card } from './src/Card.js';
import { Player } from './src/Player.js';

window.customElements.define('player-memorama', Player);
window.customElements.define('card-memorama', Card);
window.customElements.define('lit-memorama', LitMemorama);
