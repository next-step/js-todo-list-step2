import { createElement } from '../lib/reilly/Reilly.js';

export function ToggleAll() {
  return createElement(
    'div',
    null,
    createElement('input', {
      className: 'toggle-all',
      id: 'toggle-all',
      type: 'checkbox',
    }),
    createElement(
      'label',
      { for: 'toggle-all' },
      createElement(
        'button',
        { onclick: e => console.log('toggle all!') },
        '🎊'
      )
    )
  );
}
