import { TODOS } from "./data.js";

export function createUniqueID() {
  return Date.now();
}

export function getTodosFromLocalStorage() {
  try {
    const todos = localStorage.getItem(TODOS)
      ? JSON.parse(localStorage.getItem(TODOS))
      : [];
    return todos;
  } catch {}
}

export function setTodosLocalStorage(todoList) {
  localStorage.setItem(TODOS, JSON.stringify(todoList));
}

export function validateUserData(user) {
  if (
    user.hasOwnProperty("name") &&
    user.hasOwnProperty("_id") &&
    user.name.length > 0 &&
    typeof user.name === "string" &&
    typeof user._id === "string"
  ) {
    return true;
  }
  return false;
}

export function validateTodoList(todoList) {
  if (
    todoList.every(
      (todo) =>
        todo.hasOwnProperty("_id") &&
        todo.hasOwnProperty("contents") &&
        todo.hasOwnProperty("isCompleted") &&
        todo.hasOwnProperty("priority") &&
        todo._id.length > 0 &&
        todo.contents.length > 0 &&
        typeof todo.contents === "string" &&
        typeof todo._id === "string" &&
        typeof todo.isCompleted === "boolean"
    )
  ) {
    return true;
  }
  return false;
}
