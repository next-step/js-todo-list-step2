export const SELECTOR = {
  TODO_APP: '#todoapp',
  TODO_LIST: '.todo-list',
  TODO_INPUT: '.new-todo',
  EDIT_INPUT: '.edit',
  TODO_COUNTER: '.todo-count',
  FILTER: '.filters',
  USER_TITLE: '#user-title',
  USER_LIST: '#user-list',
  CLEAR_ALL: '.clear-completed',
  TODO_CONTENTS: '.todo-contents',
};

export const CLASS_NAME = {
  SELECTED: 'selected',
  COMPLETED: 'completed',
  EDITING: 'editing',
  TOGGLE: 'toggle',
  DESTROY: 'destroy',
  PRIORITY_SELECT: 'select',
};

export const ACTION_NAME = {
  CREATE_USER: 'createUser',
  REMOVE_USER: 'deleteUser',
};

export const NODE_NAME = {
  LIST: 'li',
  LABEL: 'label',
  ANCHOR: 'a',
};

export const STATUS = {
  ALL: 'all',
  COMPLETED: 'completed',
  ACTIVE: 'active',
};

export const PRIORITY = {
  NONE: 'NONE',
  FIRST: 'FIRST',
  SECOND: 'SECOND',
};

export const KEY_NAME = {
  ENTER: 'Enter',
  ESC: 'Escape',
};

export const POPUP_MESSAGE = {
  CREATE_USER: '추가하고 싶은 이름을 입력해주세요',
  REMOVE_USER: (userName) => `정말 ${userName}을 삭제하시겠습니까?`,
  REMOVE_TODO: '정말 삭제하시겠습니까?',
};
