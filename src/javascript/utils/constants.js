export const ERROR_MESSAGE = {
  GET_USERS: '유저를 불러오는데 실패했습니다.',
  CREATE_ITEM: '아이템을 생성하는데 실패했습니다.',
  DELETE_ITEM: '선택한 아이템을 삭제하는데 실패했습니다.',
  DELETE_ALL_ITEM: '선택한 유저의 아이템들을 삭제하는데 실패했습니다.',
  ADD_USER: '유저를 생성하는데 실패했습니다.',
  DELETE_USER: '선택한 유저를 삭제하는데 실패했습니다.',
  GET_USER: '선택한 유저를 불러오는데 실패했습니다.',
  SET_PRIORITY: '선택한 아이템의 우선순위를 변경하는데 실패했습니다.',
  UPDATE_COMPLETE: '선택한 아이템의 complete 변경을 실패했습니다.',
  UPDATE_CONTENT: '선택한 아이템의 내용 변경을 실패했습니다.',
  NO_USER_SELECTED: '유저를 먼저 선택해주세요.',
  TODO_LENGTH: 'todo는 두 글자 이상이어야 합니다.',
  SELECT_USER_FIRST: '유저를 먼저 선택해주세요!',
};

export const RENDER_COMMAND = {
  ADD: 'add',
  EDIT_START: 'editStart',
  EDIT_APPLY: 'editApply',
  EDIT_END: 'editEnd',
  REMOVE: 'remove',
  TOGGLE: 'toggle',
  REFRESH: 'refresh',
  SHOW_ALL: 'showAll',
  SHOW_ACTIVE: 'showActive',
  SHOW_COMPLETED: 'showCompleted',
  SWITCH_USER: 'switchUser',
  ADD_USER: 'addUser',
  DELETE_USER: 'deleteUser',
  SET_PRIORITY: 'setPriority',
  DELETE_ALL: 'deleteAll',
};

export const EVENT_NAME = {
  ADD: 'add',
  REFRESH: 'refresh',
  DESTROY: 'destroy',
  TOGGLE: 'toggle',
  SELECT_ALL: 'selectAll',
  SELECT_ACTIVE: 'selectActive',
  SELECT_COMPLETED: 'selectCompleted',
  EDIT: 'edit',
  EDIT_END: 'editEnd',
  EDIT_APPLY: 'editApply',
  SELECT_USER: 'selectUser',
  ADD_USER: 'addUser',
  DELETE_USER: 'deleteUser',
  SET_PRIORITY: 'setPriority',
  DELETE_ALL: 'deleteAll',
};

export const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

export const RETRY_COUNT = 3;
