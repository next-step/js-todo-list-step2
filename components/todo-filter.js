export default class TodoFilter {
  constructor(allRemoveTodo, updateTodoList) {
    this.todoFilterElement = document.querySelector('.count-container');
    this.filtersElement = document.querySelector('.filters');
    this.allClearElement = document.querySelector('.clear-completed');
    this.todoCount = 0;
    this.allRemoveTodo = allRemoveTodo;
    this.updateTodoList = updateTodoList;

    this.selectFilterEvent();
    this.allClearTodos();
  }

  setState(count) {
    this.todoCount = count;
    this.render();
  }

  updateSelectedClass() {
    Array.from(this.filtersElement.children).forEach((liEl) => {
      const anchorElement = liEl.children[0];
      const type = anchorElement.hash;

      if (type === location.hash && type === '#/') {
        anchorElement.classList.add('selected');
      } else if (type === location.hash && type === '#/active') {
        anchorElement.classList.add('selected');
      } else if (type === location.hash && type === '#/completed') {
        anchorElement.classList.add('selected');
      } else {
        anchorElement.classList.remove('selected');
      }
    });
  }

  selectFilterEvent() {
    this.filtersElement.addEventListener('click', ({ target }) => {
      location.hash = target.hash;
      this.updateTodoList();
    });
  }

  allClearTodos() {
    this.allClearElement.addEventListener('click', () => {
      this.allRemoveTodo();
    });
  }

  todoCountTemplate() {
    const todoCountEl = document.createElement('span');
    todoCountEl.className = 'todo-count';
    todoCountEl.innerHTML = `총 <strong>${this.todoCount}</strong> 개`;
    return todoCountEl;
  }

  render() {
    console.log(location.hash);
    this.updateSelectedClass();
    console.dir(this.todoFilterElement);
    if (this.todoFilterElement.childNodes[0].className === 'todo-count') {
      this.todoFilterElement.childNodes[0].remove();
    }
    this.todoFilterElement.prepend(this.todoCountTemplate());
  }
}
