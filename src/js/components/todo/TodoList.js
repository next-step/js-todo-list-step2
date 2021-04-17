import { todoItem } from './todoItem.js';
export default class TodoList {
  constructor({ todoListUl, todoData, onCheckItem, onEditItem, onDeleteItem }) {
    this.todoListUl = document.getElementById('todo-list');
    this.todoData = todoData;
    this.handleCheckItem = onCheckItem;
    this.handleEditItem = onEditItem;
    this.handleDeleteItem = onDeleteItem;

    this.init();
  }

  setState(data) {
    this.todoData = data;
    this.todoListUl.innerHTML = '';
    this.render();
  }

  init() {
    this.todoListUl.addEventListener('click', (e) => {
      const target = e.target;
      const parentId = e.target.closest('li').id;
      if (target.classList.contains('toggle')) this.handleCheckItem(parentId);
      if (target.classList.contains('destroy')) this.handleDeleteItem(parentId);
    });

    this.todoListUl.addEventListener('dblclick', (e) => {
      const target = e.target;
      if (!target.classList.contains('label')) return;
      const parentLi = e.target.closest('li');
      const editingEls = document.querySelectorAll('li.editing');

      editingEls.forEach((li) => li.classList.remove('editing'));
      parentLi.classList.add('editing');
      this.handleEditInput(parentLi);
    });
  }

  handleEditInput(parentLi) {
    const editInput = parentLi.querySelector('input.edit');
    editInput.focus();
    editInput.onkeydown = (e) => {
      if (e.keyCode === 13) {
        const title = e.target.value.trim();
        const parentId = e.target.closest('li').id;
        this.handleEditItem(parentId, title);
      } else if (e.keyCode === 27) {
        parentLi.classList.remove('editing');
      }
    };
  }

  render() {
    if (!this.todoData) return;
    this.todoListUl.innerHTML = this.todoData
      .map((data) => todoItem(data))
      .join('');
  }
}
