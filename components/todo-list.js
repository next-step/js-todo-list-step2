export default class TodoList {
  constructor() {
    this.todoListElement = document.querySelector('.todo-list');
    this.todos = [];

    this.applyEvent();
  }

  applyEvent() {
    this.todoListElement.addEventListener('click', ({ target }) => {
      console.log(target, target.closest('li'));
    });
  }

  setTodos(todos) {
    if (!todos) {
      throw new Error('Exist not todo list.');
    }
    this.todos = todos;
    this.render();
  }

  loadingTemplate() {
    return `
      <div class="animated-background">
        <div class="skel-mask-container">
          <div class="skel-mask"></div>
        </div>
      </div>
    `;
  }

  priorityTemplate(priority) {
    if (priority === '1') {
      return `<span class="chip primary">1순위</span>`;
    }
    if (priority === '2') {
      return `<span class="chip secondary">2순위</span>`;
    }

    return `
      <select class="chip select">
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>
    `;
  }

  render() {
    const todoListElementsText = this.todos.map((todo) => {
      return `
        <li>
          <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">
              ${this.priorityTemplate(todo.priority)}
              ${todo.contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit hidden" value="완료된 타이틀" />
        </li>
      `;
    });
    this.todoListElement.innerHTML = todoListElementsText.join('');
  }
}
