export default class TodoList {
  priorityList = ['0', '1', '2'];
  priorityState = {
    '1': 'primary',
    '2': 'secondary',
  };

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
        el.classList.add('hidden');
        parentElement.classList.add('editing');
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
      if (!parentEl.classList.contains('completed')) {
        this.changeTodoMode(parentEl);
      }
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
      if (originTodo && originTodo.contents !== target.value) {
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
    let classNames = ['chip', 'select'];
    const state = this.priorityState[priority];
    if (state) {
      classNames.push(state);
    }

    const priorityValue = this.priorityList.includes(priority) ? priority : '0';
    const optionElements = this.priorityList.map((value) => {
      return `
        <option value="${value}" ${value === priorityValue ? 'selected' : ''}>
          ${value === '0' ? '' : value}순위
        </option>
      `;
    });

    return `
      <select class="${classNames.join(' ')}" value="${priorityValue}">
        ${optionElements.join('')}
      </select>
    `;
  }

  getTodoClassState(todo) {
    return todo.isCompleted ? 'class="completed"' : '';
  }

  render() {
    const todoListElementsText = this.todoList.map((todo) => {
      return `
        <li id="${todo._id}" ${this.getTodoClassState(todo)}>
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
