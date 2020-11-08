export const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const TARGETS = Object.freeze({
  TODO_INPUT: "#new-todo",
  TODO_USER_LIST: "#user-list",
  TODO_USER_LIST_INPUT: "#user-list-input",
  TODO_USER_CREATE_BUTTON: "#user-create-button",
  TODO_USER_DELETE_BUTTON: "#user-delete-button",
  TODO_LIST: "#todo-list",
  TODO_COUNT: "#todo-count",
  TODO_FILTER: "#filters",
  TODO_DELETE_ALL_BUTTON: "#clear-completed"
});

export const MESSAGES = Object.freeze({
  ADD_USER_PROMPT: "추가하고 싶은 이름을 입력해주세요.",
  ADD_USER_ALERT: "이름은 2글자 이상 입력해주세요.",
  DELETE_USER_CONFIRM: "정말 삭제하시겠습니까?",
  TODO_CONTENTS_ALERT: "내용은 2자 이상 입력해주세요."
});
