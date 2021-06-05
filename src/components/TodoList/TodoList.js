import { $ } from '../../utils/utils.js';
import { KEY, DOM_ID, PRIORITY } from '../../constants/constants.js';

import TodoState from '../../store/todoState.js';

import {
  toggleTodoItem,
  getTodoList,
  deleteItem,
  updateItemContents,
  updateItemPriority,
} from '../../api/todolist.js';

export default class TodoList {
  constructor({ setTodoList, userState }) {
    this.$target = $(DOM_ID.TODO_LIST);

    this.todoState = TodoState;
    this.setTodoList = setTodoList;
    this.userState = userState;

    this._addEvent();
  }

  _addEvent() {
    this.$target.addEventListener('click', this._toggleTodoDone.bind(this));
    this.$target.addEventListener('click', this._deleteTodo.bind(this));
    this.$target.addEventListener('dblclick', this._openEditMode.bind(this));
    this.$target.addEventListener('keyup', this._closeEditMode.bind(this));
    this.$target.addEventListener('change', this.changeSelector.bind(this));
  }

  async changeSelector({ target }) {
    if (!target.classList.contains('chip')) return;
    const selectValue = target.value;
    if (selectValue === PRIORITY['select']) return;

    const userId = this.userState.get().userId;
    const todoId = target.closest('li').id;

    const result = await updateItemPriority(userId, todoId, { priority: selectValue });
    // console.log(result);
    this.todoState.set();
  }

  async _deleteTodo({ target }) {
    if (target.classList.value !== 'destroy') return;

    const userId = this.userState.get().userId;
    const todoId = target.id;

    const result = await deleteItem(userId, todoId);
    // console.log('delete', result);

    this.todoState.set();
  }

  async _toggleTodoDone({ target }) {
    if (target.classList.value !== 'toggle') return;

    const userId = this.userState.get().userId;
    const todoId = target.id;

    const result = await toggleTodoItem(userId, todoId);
    // console.log(result);

    this.todoState.set();
  }

  async _updateTodoValue(todoId, updatedValue) {
    const userId = this.userState.get().userId;

    const result = await updateItemContents(userId, todoId, { contents: updatedValue });
    // console.log(result);

    this.todoState.set();
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

  async render(todoList) {
    const userId = this.userState.get().userId;
    todoList = todoList || (await getTodoList(userId));

    const todoItemTemplate = todoList.map(getTodoItemTemplate);
    this.$target.innerHTML = todoItemTemplate.join('');
  }
}

function getPriortyTemplate(priority) {
  return PRIORITY[priority] === 'select'
    ? `
        <select class="chip select">
        <option value="${PRIORITY['NONE']}" selected>순위</option>
        <option value="${PRIORITY['FIRST']}">1순위</option>
        <option value="${PRIORITY['SECOND']}">2순위</option>
        </select>
      `
    : `
        <span class="chip ${priority}">${priority === PRIORITY['FIRST'] ? '1' : '2'}순위</span>
      `;
}

function getTodoItemTemplate({ _id, contents, isCompleted, priority }) {
  const selectView = getPriortyTemplate(priority);

  return `
  <li id="${_id}" class="${isCompleted && 'completed'}">
    <div class="view">
      <input id="${_id}" class="toggle" type="checkbox" ${isCompleted && 'checked'}/>
      <label class="label">
        ${selectView}
        ${contents}
      </label>
      <button id=${_id} class="destroy"></button>
    </div>
    <input id="${_id}" class="edit" value=${contents} />
  </li>
  `;
}
