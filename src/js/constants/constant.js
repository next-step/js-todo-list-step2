export const FILTER_TYPE = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

export const UI_CLASS = {
  TOGGLE: "toggle",
  DESTROY: "destroy",
  LABEL: "label",
  SELECTED: "selected",
  FILTER: "todo-filter",
  TODO_ITEM: "todo-item-li",
  EDITING: "editing",
  SELECT: "select"
};

export const KEY = {
  ENTER: "Enter",
  ESCAPE: "Escape",
};

export const ACTION = {
  CREATE_USER: "createUser",
  DELETE_USER: "deleteUser",
}

export const MESSAGES = {
  DELETE_TODO: "삭제하시겠습니까?",
  CREATE_USER: "추가하고 싶은 이름을 입력해주세요.",
  INVALID_CREATE_USER: "2글자 이상이어야 합니다.",
  DELETE_USER: "을 삭제하시겠습니까?",
  INVALID_ADD_TODO: "2글자 이상이어야 합니다.",
};

export const VALIDATION = {
  MIN_USER_NAME_LENGTH: 2,
  MIN_TODO_CONTENTS_LENGTH: 2,
};
