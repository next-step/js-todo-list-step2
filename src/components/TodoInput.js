export default class TodoInput {
  constructor({ $target, addTodo }) {
    const section = document.createElement('section');
    section.className = 'input-container';

    const input = document.createElement('input');
    input.className = 'new-todo';
    input.placeholder = '할 일을 입력해주세요';
    input.autofocus = true;
    input.addEventListener('keypress', ({ key, target }) => {
      if (key !== 'Enter' || target.value < 2) return;
      addTodo(target.value);
      target.value = '';
    });

    section.appendChild(input);
    $target.appendChild(section);
  }
}
