import { ENTER, ESCAPE, FIRST, SECOND } from '../constants.js';
import { todoItemTemplate } from '../templates.js';

export default class TodoList {
  constructor({ onToggle, onRemove, onUpdate, onSetPriority }) {
    this.$todoList = document.querySelector('.todo-list');

    this.$todoList.addEventListener('click', (event) => this.toggleTodoItem(event, onToggle));
    this.$todoList.addEventListener('click', (event) => this.removeTodoItem(event, onRemove));
    this.$todoList.addEventListener('dblclick', (event) => this.editTodoItem(event));
    this.$todoList.addEventListener('keydown', (event) => this.updateTodoItem(event, onUpdate));
    this.$todoList.addEventListener('change', (event) => this.setTodoItemPriority(event, onSetPriority));
  }

  render(todoList) {
    const template = todoList.map(todoItemTemplate);
    this.$todoList.innerHTML = template.join('');
  }

  toggleTodoItem(event, onToggle) {
    const toggleButtonTarget = event.target;
    if (!toggleButtonTarget.classList.contains('toggle')) return;
    onToggle(toggleButtonTarget.id);
  }

  removeTodoItem(event, onRemove) {
    const deleteButtonTarget = event.target;
    if (!deleteButtonTarget.classList.contains('destroy')) return;
    onRemove(deleteButtonTarget.id);
  }

  editTodoItem(event) {
    const labelTarget = event.target;
    if (!labelTarget.classList.contains('label')) return;

    const todoItem = labelTarget.closest('li');
    todoItem.classList.toggle('editing');

    const editingInput = todoItem.querySelector('.edit');
    editingInput.focus();
    const { length } = editingInput.value;
    editingInput.setSelectionRange(length, length);
  }

  updateTodoItem(event, onUpdate) {
    const { key, target: editingInputTarget } = event;
    if (!editingInputTarget.classList.contains('edit')) return;

    const todoItem = editingInputTarget.closest('li');

    if (key === ESCAPE) {
      todoItem.classList.remove('editing');
      return;
    }

    if (key !== ENTER) return;

    const { value } = editingInputTarget;
    if (value === '') return;
    onUpdate(todoItem.id, value);
  }

  setTodoItemPriority(event, onSetPriority) {
    const selectTarget = event.target;
    if (!selectTarget.classList.contains('select')) return;

    const todoItem = selectTarget.closest('li');

    const { value } = selectTarget;
    const priority = value === '1' ? FIRST : SECOND;
    onSetPriority(todoItem.id, priority);
  }
}
