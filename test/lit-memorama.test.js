import { html, fixture, expect } from '@open-wc/testing';

import '../lit-memorama.js';

describe('LitMemorama', () => {

  it('get game difficulty', async () => {
    const el = await fixture(html`<lit-memorama></lit-memorama>`);
    el.onChange();
    expect(el.gameDifficulty).to.equal(15);
  });

  it('close selected card', async () => {
    const el = await fixture(html`<lit-memorama></lit-memorama>`);
    el._closeCards();
  });

  it('play selected card equal', async () => {
    const el = await fixture(html`<lit-memorama></lit-memorama>`);
    el.opened = [{icon: '🌟'}, {icon: '🌟'}];
    el._played();
  });

  it('play selected card diff', async () => {
    const el = await fixture(html`<lit-memorama></lit-memorama>`);
    el.opened = [{icon: '🌟'}, {icon: '🍒'}];
    el._played();
  });

  it('open selected card', async () => {
    const el = await fixture(html`<lit-memorama></lit-memorama>`);
    el.canMove = true;
    el.opened = [{index: 0}, {index: 1}];
    el._openCard(el.opened[1]);
  });

  it('open selected card empty', async () => {
    const el = await fixture(html`<lit-memorama></lit-memorama>`);
    el.canMove = true;
    el.opened = [];
    el._openCard([{index: 0}]);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture(
      html`<lit-memorama title="attribute title"></lit-memorama>`
    );

    expect(el.title).to.equal('attribute title');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture(html`<lit-memorama></lit-memorama>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
