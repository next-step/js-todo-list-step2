import UserService from "../client/userService.js";
import Render from "./render.js";
const apiService = new UserService();
const render = new Render();

const $deleteAllTodosBtn = document.querySelector(".clear-completed");
const $input = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");

const $filters = document.querySelector(".filters");

export default class SelectedUser {
  selectedUserState = (userId) => {
    apiService.fetchUserTodo(userId).then(render.showItems);
    $input.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      if (e.key === "Enter") {
        this.addNewTodo(userId, $input.value);
        $input.value = "";
      }
    });
    $deleteAllTodosBtn.addEventListener("click", () =>
      this.deleteAllTodos(userId)
    );
    $todoUl.addEventListener("click", (e) =>
      this.todolistEventHandler(e, userId)
    );
    $todoUl.addEventListener("dblclick", (e) =>
      this.todoEditHandler(e, userId)
    );
    $filters.addEventListener("click", (e) => {
      const prev = e.currentTarget.querySelector(".selected");
      prev.classList.toggle("selected");
      const now = e.target;
      now.classList.toggle("selected");
      this.handleFiltering(now.classList, userId);
    });
  };

  handleFiltering = (condition, userId) => {
    if (condition.contains("completed")) {
      apiService
        .fetchUserTodo(userId)
        .then((todos) => todos.filter((todo) => todo.isCompleted))
        .then(render.showItems);
      return;
    }
    if (condition.contains("active")) {
      apiService
        .fetchUserTodo(userId)
        .then((todos) => todos.filter((todo) => !todo.isCompleted))
        .then(render.showItems);
      return;
    }
    if (condition.contains("all")) {
      apiService //
        .fetchUserTodo(userId)
        .then(render.showItems);
      return;
    }
  };

  deleteAllTodos = (userId) => {
    $filters.getElementsByClassName("selected")[0].classList.toggle("selected");
    $filters.querySelector(".all").classList.toggle("selected");
    window.location.replace("/#");
    apiService
      .deleteUserTodosAll(userId)
      .then(() => apiService.fetchUserTodo(userId))
      .then(render.showItems);
  };

  todoEditHandler = (e, userId) => {
    const { classList } = e.target;
    const $label = e.target.closest("li");
    if (classList.contains("label")) {
      $label.classList.toggle("editing");
      $label.addEventListener("keydown", (e) => {
        const targetId = $label.dataset.id;
        if (e.key === "Enter") {
          const contents = e.target.value;
          apiService
            .updateUserTodo(userId, targetId, contents)
            .then(() => apiService.fetchUserTodo(userId))
            .then(render.showItems);
          return;
        }
        if (e.key === "Escape") {
          $label.classList.toggle("editing");
          return;
        }
      });
    }
  };

  todolistEventHandler = (e, userId) => {
    const { classList } = e.target;
    const targetId = e.target.closest("li").dataset.id;
    if (classList.contains("destroy")) {
      $filters
        .getElementsByClassName("selected")[0]
        .classList.toggle("selected");
      $filters.querySelector(".all").classList.toggle("selected");
      window.location.replace("/#");
      apiService
        .deleteUserTodoOne(userId, targetId)
        .then(() => apiService.fetchUserTodo(userId))
        .then(render.showItems);
      return;
    }
    if (classList.contains("toggle")) {
      $filters
        .getElementsByClassName("selected")[0]
        .classList.toggle("selected");
      $filters.querySelector(".all").classList.toggle("selected");
      window.location.replace("/#");
      apiService
        .toggleUserTodo(userId, targetId)
        .then(() => apiService.fetchUserTodo(userId))
        .then(render.showItems);
      return;
    }
    if (classList.contains("chip")) {
      const { value } = e.target;
      if (value === "0") {
        const priorityValue = "NONE";
        apiService.makePriorityUserTodo(userId, targetId, priorityValue);
        return;
      }
      if (value === "1") {
        const priorityValue = "FIRST";
        apiService
          .makePriorityUserTodo(userId, targetId, priorityValue)
          .then(() => apiService.fetchUserTodo(userId))
          .then(render.showItems);
        return;
      }
      if (value === "2") {
        const priorityValue = "SECOND";
        apiService
          .makePriorityUserTodo(userId, targetId, priorityValue)
          .then(() => apiService.fetchUserTodo(userId))
          .then(render.showItems);
        return;
      }
    }
  };

  addNewTodo = (userId, newTodo) => {
    $filters.getElementsByClassName("selected")[0].classList.toggle("selected");
    $filters.querySelector(".all").classList.toggle("selected");
    window.location.replace("/#");
    apiService
      .addUserTodo(userId, newTodo)
      .then(() => apiService.fetchUserTodo(userId))
      .then(render.showItems);
  };
}
