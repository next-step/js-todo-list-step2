export default class TodoInput {
  constructor({ $target }) {
    const section = document.createElement('section');
    section.className = 'input-container';

    const input = document.createElement('input');
    input.className = 'new-todo';
    input.placeholder = '할 일을 입력해주세요';
    input.autofocus = true;

    section.appendChild(input);
    $target.appendChild(section);
  }
}
