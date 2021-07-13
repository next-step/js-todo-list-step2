export default class Title {
  constructor({ $target }) {
    const h1 = document.createElement('h1');
    h1.id = 'user-title';
    h1.dataset.username = 'eastjun';

    const span = document.createElement('span');
    span.innerHTML = "<strong>eastjun</strong>'s Todo List";

    h1.appendChild(span);
    $target.appendChild(h1);
  }
}
