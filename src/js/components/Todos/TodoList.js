import { $ } from '../../utils/common.js';

export default function TodoList() {
  this.$Todos = [];
  this.$TodosDom = $('.todo-list');

  this.setState = (todos) => {
    this.$Todos = todos;
    this.render();
  }

  this.render = () => {
    const todos = this.$Todos.map(todo => template(todo));
    this.$TodosDom.innerHTML = todos.join('');
  }
}

function template(todo) {
  const todoTemplate = `
    <li key=${todo._id}>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label class="label">
          <select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
          </select>
          ${todo.contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />
    </li>
  `;

  return todoTemplate;
}

// contents: "확인용"
// isCompleted: true
// priority: "NONE"
// _id: "U3sM73nmQ"