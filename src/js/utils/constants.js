const TODO_BUTTONS = Object.freeze({
  TOGGLE: "toggle",
  LABEL: "label",
  DESTROY: "destroy",
  EDIT: "edit",
  EDITING: "editing",
  COMPLETED: "completed",
  SELECTED: "selected",
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
});

export { TODO_BUTTONS, FILTER_TYPES, USER_HANDLE_TYPES, ALERT_MESSAGE, PRIORITY_TYPE };
