import TodoApp from "./TodoApp.js";
import api from "../utils/api.js";

const init = async () => {
  const defaultUserName = "hsna7024";
  const $targetTodoList = document.querySelector(".todo-list");
  const $targetTodoInput = document.querySelector(".new-todo");
  const $targetTodoCount = document.querySelector(".todo-count");
  const $targetTodoFilter = document.querySelector(".filters");
  const $targetUserList = document.querySelector("#user-list");
  const $targetUserTitle = document.querySelector("#user-title");
  const data = await api.getTodos(defaultUserName);
  const users = await api.getUsers();

  const params = {
    $targetTodoList,
    $targetTodoInput,
    $targetTodoCount,
    $targetTodoFilter,
    $targetUserList,
    $targetUserTitle,
    data,
    userName: defaultUserName,
    users,
  };

  new TodoApp(params);
};

init();
