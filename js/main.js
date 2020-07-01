import TodoApp from "./TodoApp.js";
import api from "../utils/api.js";

const init = async () => {
  const defaultUsername = "hsna7024";
  const $targetTodoList = document.querySelector(".todo-list");
  const $targetTodoInput = document.querySelector(".new-todo");
  const $targetTodoCount = document.querySelector(".todo-count");
  const $targetTodoFilter = document.querySelector(".filters");
  const data = await api.getTodos(defaultUsername);

  const params = {
    $targetTodoList,
    $targetTodoInput,
    $targetTodoCount,
    $targetTodoFilter,
    data,
    username: defaultUsername,
  };

  new TodoApp(params);
};

init();
