export default class TodoList {
  constructor(toggleTodo, editTodo, removeTodo) {
    this.todoListElement = document.querySelector('.todo-list');
    this.todos = [];
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
    this.removeTodo = removeTodo;

    this.applyEvent();
  }

  applyEvent() {
    this.todoListElement.addEventListener('dblclick', ({ target }) => {
      const parentEl = target.closest('li');
      console.dir(parentEl);
      Array.from(parentEl.children).forEach((el) => {
        console.log(el);
        if (el.classList.contains('hidden')) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      });
    });
    this.todoListElement.addEventListener('click', ({ target }) => {
      let todoId = target.closest('li').id;

      if (target.className === 'destroy') {
        this.removeTodo(todoId);
      } else if (target.className === 'edit') {
        this.editEvent(todoId);
      } else if (target.className === 'toggle') {
        this.toggleTodo(todoId);
      }
    });
  }

  findEditText(todoId) {
    const target = document.querySelector(`#edit-${todoId}`);
    return target.value;
  }

  findTodoItem(targetId) {
    return this.todos.find((todo) => todo._id === targetId);
  }

  editEvent(todoId) {
    const targetTodo = this.findTodoItem(todoId);
    let changeValue = '';
    if (targetTodo.isCompleted) {
      changeValue = this.findEditText(todoId);
    }
    this.editTodo(todoId, changeValue);
  }

  setTodos(todos) {
    this.todos = todos || [];
    this.render();
    if (!todos) {
      throw new Error('Exist not todo list.');
    }
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
        <li id="${todo._id}">
          <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.isCompleted ? 'checked' : ''
            }/>
            <label class="label">
              ${this.priorityTemplate(todo.priority)}
              ${todo.contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit hidden" value="${todo.contents}" />
        </li>
      `;
    });
    this.todoListElement.innerHTML = todoListElementsText.join('');
  }
}
