export default class TodoList {
  constructor(toggleTodo, editTodo, changePriority, removeTodo) {
    this.todoListElement = document.querySelector('.todo-list');
    this.todoList = [];
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
    this.changePriority = changePriority;
    this.removeTodo = removeTodo;

    this.applyEvent();
  }

  changeTodoMode(parentElement) {
    Array.from(parentElement.children).forEach((el) => {
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
      } else {
        parentElement.classList.add('editing');
        el.classList.add('hidden');
      }
    });
  }

  findOriginTodo(targetId) {
    return this.todoList.find((todo) => todo._id === targetId);
  }

  applyEvent() {
    this.changeTodoModeEvent();
    this.updateEvent();
    this.selectChangeEvent();

    this.todoListElement.addEventListener('click', async ({ target }) => {
      const parentEl = target.closest('li');
      const todoId = parentEl.id;

      if (target.className === 'destroy') {
        this.removeTodo(todoId);
      } else if (target.className === 'toggle') {
        this.toggleTodo(todoId);
      } else if (target.classList.contains('chip')) {
        // this.changePriority(todoId, )
      }
    });
  }

  changeTodoModeEvent() {
    this.todoListElement.addEventListener('dblclick', ({ target }) => {
      if (
        !target.classList.contains('label') &&
        !target.classList.contains('edit')
      ) {
        return;
      }

      const parentEl = target.closest('li');
      this.changeTodoMode(parentEl);
    });
  }

  updateEvent() {
    this.todoListElement.addEventListener('keypress', ({ code, target }) => {
      if (!target.classList.contains('edit') || code != 'Enter') {
        return;
      }
      const parentEl = target.closest('li');
      this.changeTodoMode(parentEl);

      const targetId = parentEl.id;
      const originTodo = this.findOriginTodo(targetId);
      if (originTodo && originTodo.contents === target.value) {
        this.editTodo(targetId, target.value);
      }
    });
  }

  selectChangeEvent() {
    this.todoListElement.addEventListener('change', ({ target }) => {
      const parentEl = target.closest('li');
      const targetId = parentEl.id;
      const selectedValue = target.value;
      this.changePriority(targetId, selectedValue);
    });
  }

  setTodoList(todoList) {
    this.todoList = todoList || [];
    this.render();
    if (!todoList) {
      throw new Error('Todo List가 없습니다.');
    }
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
        <option value="0">순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>
    `;
  }

  getTodoClassState(todo) {
    if (todo.isCompleted) {
      return 'completed';
    }
    return '';
  }

  render() {
    const todoListElementsText = this.todoList.map((todo) => {
      return `
        <li id="${todo._id}" class="${this.getTodoClassState(todo)}">
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
