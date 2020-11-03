import { MESSAGES, FILTER } from '../constants/index.js';
import { isValidUserName } from '../utils/validators.js';
import eventChannel from '../core/eventChannel.js';

const { done, when } = eventChannel;

export const VIEW = {
  INIT: 'view/init',
  ADD_USER: 'view/addUser',
  DELETE_USER: 'view/deleteUser',
  CHANGE_USER: 'view/changeUser',
  ADD_TODO: 'view/addTodo',
  DELETE_TODO: 'view/deleteTodo',
  TOGGLE_TODO: 'view/toggleTodo',
  UPDATE_TODO: 'view/updateTodo',
  CHANGE_FILTER: 'view/changeFilter',
};

export const STORE = {
  UPDATE: 'store/update',
};

export const onCreateUserButtonClick = () => {
  const name = prompt(MESSAGES.ADD_USER);

  isValidUserName(name)
    ? done(VIEW.ADD_USER, { name })
    : alert(MESSAGES.FAILED_ADD_USER);
};

export const onDeleteUserButtonClick = () => {
  confirm(MESSAGES.DELETE_USER) && done(VIEW.DELETE_USER);
};

export const onChangeUserButtonClick = (e) => {
  done(VIEW.CHANGE_USER, { id: e.target.dataset.userId });
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

export const onChangeFilterButtonClick = ({ target }) => {
  const { className } = target;

  switch (className) {
    case FILTER.ALL:
      done(VIEW.CHANGE_FILTER, { currentFilter: FILTER.ALL });
      return;
    case FILTER.ACTIVE:
      done(VIEW.CHANGE_FILTER, { currentFilter: FILTER.ACTIVE });
      return;
    case FILTER.COMPLETED:
      done(VIEW.CHANGE_FILTER, { currentFilter: FILTER.COMPLETED });
      return;
    default:
      return;
  }
};
