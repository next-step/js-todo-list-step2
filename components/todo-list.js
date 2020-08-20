export default class TodoList {
  constructor(toggleTodo, editTodo, removeTodo) {
    this.todoListElement = document.querySelector('.todo-list');
    this.todoList = [];
    this.toggleTodo = toggleTodo;
    this.editTodo = editTodo;
    this.removeTodo = removeTodo;

    this.applyEvent();
  }

  changeTodoMode(parentElement) {
    Array.from(parentElement.children).forEach((el) => {
      if (el.classList.contains('hidden')) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  findOriginTodo(targetId) {
    return this.todoList.find((todo) => todo._id === targetId);
  }

  applyEvent() {
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

    this.todoListElement.addEventListener('click', ({ target }) => {
      let todoId = target.closest('li').id;

      if (target.className === 'destroy') {
        this.removeTodo(todoId);
      } else if (target.className === 'toggle') {
        this.toggleTodo(todoId);
      }
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
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
      </select>
    `;
  }

  render() {
    const todoListElementsText = this.todoList.map((todo) => {
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
