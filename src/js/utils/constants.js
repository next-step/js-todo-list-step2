const TODO_BUTTONS = Object.freeze({
  TOGGLE: "toggle",
  LABEL: "label",
  DESTROY: "destroy",
  EDIT: "edit",
  EDITING: "editing",
  COMPLETED: "completed",
  SELECTED: "selected",
  CHIP: "chip",
});

const FILTER_TYPES = Object.freeze({
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
});

const USER_HANDLE_TYPES = Object.freeze({
  CREATE: "createUser",
  DELETE: "deleteUser",
});

const PRIORITY_TYPE = Object.freeze({
  NONE: "NONE",
  FIRST: "FIRST",
  SECOND: "SECOND",
});

const ALERT_MESSAGE = Object.freeze({
  CREATE: "추가하고 싶은 이름을 입력해주세요.",
  DELETE: (name) => `${name}을 삭제하시겠습니까?`,
  DELETE_ALL: "모든 할 일은 삭제하시겠습니까?",
  DELETE_ITEM: "할 일을 삭제하시겠습니까?",
  LENGTH_ALERT: "2글자 이상이어야 합니다.",
});

const KEY_NAME = Object.freeze({
  ENTER: "Enter",
  ESCAPE: "Escape",
});

const CONSTRAINTS = 2;

export { TODO_BUTTONS, FILTER_TYPES, USER_HANDLE_TYPES, ALERT_MESSAGE, PRIORITY_TYPE, KEY_NAME, CONSTRAINTS };
