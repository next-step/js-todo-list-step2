import { $ } from '../../utils/utils.js';
import { KEY, DOM_ID, PRIORITY } from '../../constants/constants.js';
import TodoState from '../../store/todoState.js';

function getPriortyTemplate(priority) {
  return PRIORITY[priority] === 'select'
    ? `
        <select class="chip select">
        <option value="0" selected>순위</option>
        <option value="1">1순위</option>
        <option value="2">2순위</option>
        </select>
      `
    : `
        <span class="chip ${PRIORITY[priority]}">1순위</span>해야할 아이템
      `;
}

export default class TodoList {
  constructor({ setTodoList }) {
    this.$target = $(DOM_ID.TODO_LIST);

    this.todoState = TodoState;
    this.setTodoList = setTodoList;

    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('click', this._toggleTodoDone.bind(this));
    this.$target.addEventListener('click', this._deleteTodo.bind(this));
    this.$target.addEventListener('dblclick', this._openEditMode.bind(this));
    this.$target.addEventListener('keyup', this._closeEditMode.bind(this));
  }

  _deleteTodo({ target }) {
    if (target.classList.value !== 'destroy') return;

    const todoId = target.id;
    const deletedTodoList = TodoState.get().filter((todoItem) => todoItem.id !== todoId);
    this.setTodoList(deletedTodoList);
  }

  _toggleTodoDone({ target }) {
    if (target.classList.value !== 'toggle') return;

    const todoId = target.id;
    const updatedTodoList = TodoState.get().map((todoItem) =>
      todoItem.id == todoId ? { ...todoItem, isDone: !todoItem.isDone } : todoItem,
    );

    this.setTodoList(updatedTodoList);
  }

  _updateTodoValue(todoId, updatedValue) {
    const updatedItem = TodoState.get().map((todoItem) => {
      return todoItem.id === todoId ? { ...todoItem, value: updatedValue } : todoItem;
    });

    this.setTodoList(updatedItem);
  }

  _openEditMode({ target }) {
    if (target.classList.value !== 'label') return;

    const todoItem = target.closest('li');
    todoItem.classList.add('editing');
  }

  _closeEditMode({ target, key }) {
    if (!(key === KEY.ESC || key === KEY.ENTER)) return;

    const todoItem = target.closest('li');

    const todoId = target.id;
    const updatedValue = todoItem.querySelector('.edit').value;

    if (key === KEY.ESC) {
      todoItem.classList.remove('editing');
      return;
    }

    this._updateTodoValue(todoId, updatedValue);
  }

  _getTodoItemTemplate({ _id, contents, isCompleted, priority }) {
    const selectView = getPriortyTemplate(priority);

    return `
    <li id="${_id}" class="${isCompleted && 'completed'}">
      <div class="view">
        <input id="${_id}" class="toggle" type="checkbox" ${isCompleted && 'checked'}/>
        <label class="label">
          ${selectView}
          해야할 아이템
        </label>
        <button class="destroy"></button>
      </div>
      <input id="${_id}" class="edit" value=${contents} />
    </li>
    `;
  }

  render(todoListState) {
    const todoItemTemplate = todoListState.map(this._getTodoItemTemplate);
    this.$target.innerHTML = todoItemTemplate.join('');
  }
}
