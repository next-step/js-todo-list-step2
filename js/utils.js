export function isFunction(func) {
  return typeof func === "function";
}

export function validateTodoItems(todoItems) {
  if (!Array.isArray(todoItems)) throw new Error("todoItems is not an array");
  todoItems.forEach((todoItem) => validateTodoItem(todoItem));
}

export function validateTodoItem(todoItem) {
  if (
    todoItem &&
    "_id" in todoItem &&
    typeof todoItem._id === "string" &&
    "contents" in todoItem &&
    typeof todoItem.contents === "string" &&
    "isCompleted" in todoItem &&
    typeof todoItem.isCompleted === "boolean"
  ) {
    return;
  }
  throw new Error("Wrong todoItem");
}

export function isValidTodoItems(todoItems) {
  if (!Array.isArray(todoItems)) return false;
  return todoItems.every((todoItems) => isValidTodoItem(todoItems));
}

export function isValidTodoItem(todoItem) {
  if (
    todoItem &&
    "_id" in todoItem &&
    typeof todoItem._id === "string" &&
    "contents" in todoItem &&
    typeof todoItem.contents === "string" &&
    "isCompleted" in todoItem &&
    typeof todoItem.isCompleted === "boolean"
  )
    return true;

  return false;
}

export function validateUserName(userName) {
  if (!(typeof userName === "string")) {
    throw new Error("Wrong UserName type");
  }
  if (userName === "") {
    throw new Error("userName is an empty string");
  }
}

export function createUniqueId() {
  return Date.now().valueOf().toString() + Math.floor(Math.random() * 1000);
}

export const ESC_KEY = "Escape";
