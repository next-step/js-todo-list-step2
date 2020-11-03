import { MESSAGES, PRIORITY, FILTER_LIST } from './constants/index.js';

import eventChannel from './core/eventChannel.js';

const { done, when } = eventChannel;

export const VIEW = {
  INIT: 'view/init',
  ADD_USER: 'view/addUser',
  DELETE_USER: 'view/deleteUser',
  CHANGE_USER: 'view/changeUser',
  ADD_TODO: 'view/addTodo',
  DELETE_TODO: 'view/deleteTodo',
  DELETE_ALL_TODOS: 'view/deleteAllTodos',
  TOGGLE_TODO: 'view/toggleTodo',
  UPDATE_TODO: 'view/updateTodo',
  SET_PRIORITY: 'view/setPriority',
  CHANGE_FILTER: 'view/changeFilter',
};

export const STORE = {
  UPDATE: 'store/update',
  REQUEST: 'store/request',
};

export const onCreateTodoInputEnterKeypress = ({ key, target }) => {
  if (key === 'Enter') {
    done(VIEW.ADD_TODO, { contents: target.value });
    target.value = '';
  }
};

export const onTodoItemClickHandler = ({ target }) => {
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

export const onTodoItemDoubleClickHandler = ({ target }) => {
  const { className } = target;
  const $todoItem = target.closest('li');

  if (className === 'label') {
    $todoItem.classList.add('editing');
  }
};

export const onTodoItemEditKeyDown = ({ key, target }) => {
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

export const onFooterClickHandler = ({ target }) => {
  const { className } = target;

  if (className === 'clear-completed') {
    confirm(MESSAGES.DELETE_ALL_TODOS) && done(VIEW.DELETE_ALL_TODOS);
    return;
  }

  if (FILTER_LIST.includes(className)) {
    done(VIEW.CHANGE_FILTER, { currentFilter: className });
    return;
  }
};

export const onSelectPriority = ({ target }) => {
  const $todoItem = target.closest('li');
  const id = $todoItem.dataset.todoId;

  done(VIEW.SET_PRIORITY, { id, priority: PRIORITY[target.value] });
};
