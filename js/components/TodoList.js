// core
import DOM from '../core/createElement.js';
import eventChannel from '../core/eventChannel.js';
const { done } = eventChannel;

// child components
import TodoItem from './TodoItem.js';

// constants
import { ACTIONS, PRIORITY } from '../constants/index.js';
const { VIEW } = ACTIONS;

export default class TodoList {
  constructor() {
    this.$main = DOM.section({ class: 'main' });
    this.$todoList = DOM.ul({
      class: 'todo-list',
      onclick: onTodoItemClickHandler,
      ondblclick: onTodoItemDoubleClickHandler,
      onkeydown: onTodoItemEditKeyDown,
      onchange: onSelectPriority,
    });

    this.render();
  }

  get $el() {
    return this.$main;
  }

  setLoading() {
    this.$todoList.innerHTML = `
      <li>
        <div class="view">
          <label class="label">
            <div class="animated-background">
              <div class="skel-mask-container">
                <div class="skel-mask"></div>
              </div>
            </div>
          </label>
        </div>
      </li>
    `;
  }

  setState({ todoList }) {
    this.$main.innerHTML = '';
    this.$todoList.innerHTML = '';
    this.render(todoList.map((todo) => TodoItem(todo)));
  }

  render(todos = []) {
    todos.forEach((todo) => {
      this.$todoList.appendChild(todo);
    });
    this.$main.appendChild(this.$todoList);
  }
}

const onTodoItemClickHandler = ({ target, currentTarget }) => {
  const { className } = target;
  const $todoItem = target.closest('li');
  const id = $todoItem.dataset.todoId;

  switch (className) {
    case 'toggle':
      done(VIEW.TOGGLE_TODO, { id });
      return;
    case 'destroy':
      done(VIEW.DELETE_TODO, { id });
      return;
    default:
      return;
  }
};

const onTodoItemDoubleClickHandler = ({ target }) => {
  const { className } = target;
  const $todoItem = target.closest('li');

  if (className === 'label') {
    $todoItem.classList.add('editing');
  }
};

const onTodoItemEditKeyDown = ({ key, target }) => {
  const $todoItem = target.closest('li');
  const $label = $todoItem.querySelector('.label');
  const $edit = $todoItem.querySelector('.edit');
  const id = $todoItem.dataset.todoId;

  switch (key) {
    case 'Escape':
      $edit.value = $label.lastChild.textContent;
      $todoItem.classList.remove('editing');
      return;
    case 'Enter':
      done(VIEW.UPDATE_TODO, { id, contents: target.value });
      return;
    default:
      return;
  }
};

const onSelectPriority = ({ target }) => {
  const { classList } = target;
  const $todoItem = target.closest('li');
  const id = $todoItem.dataset.todoId;

  if (classList.contains('chip') && classList.contains('select')) {
    done(VIEW.SET_PRIORITY, { id, priority: PRIORITY[target.value] });
  }
};
