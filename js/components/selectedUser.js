import UserService from "../client/userService.js";
import Render from "./render.js";
const apiService = new UserService();
const render = new Render();

const $deleteAllTodosBtn = document.querySelector(".clear-completed");
const $input = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");
const $filters = document.querySelector(".filters");

export default class SelectedUser {
  onUserDeleteHandler = (userId) => {
    apiService
      .deleteUser(userId)
      .then(() => apiService.getUsers())
      .then(render.showUsers);
  };

  selectedUserState = (userId) => {
    apiService.getUserTodo(userId).then(render.showItems);
    $input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.addNewTodo(userId, $input.value);
        $input.value = "";
      }
      return;
    });

    $deleteAllTodosBtn.addEventListener("click", () => {
      this.deleteAllTodos(userId);
    });
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
        .getUserTodo(userId)
        .then((todos) => todos.filter((todo) => todo.isCompleted))
        .then(render.showItems);
      return;
    }
    if (condition.contains("active")) {
      apiService
        .getUserTodo(userId)
        .then((todos) => todos.filter((todo) => !todo.isCompleted))
        .then(render.showItems);
      return;
    }
    if (condition.contains("all")) {
      apiService //
        .getUserTodo(userId)
        .then(render.showItems);
      return;
    }
  };

  deleteAllTodos = (userId) => {
    this.goToRedirectToMain();
    apiService
      .deleteUserTodosAll(userId)
      .then(() => apiService.getUserTodo(userId))
      .then(render.showItems);
  };

  todoEditHandler = (e, userId) => {
    const { classList } = e.target;
    const $label = e.target.closest("li");
    if (classList.contains("label")) {
      $label.classList.toggle("editing");
      $label.addEventListener("keydown", (e) => {
        const targetId = $label.dataset.id;
        switch (e.key) {
          case "Enter":
            const contents = e.target.value;
            apiService
              .updateUserTodo(userId, targetId, contents)
              .then(() => apiService.getUserTodo(userId))
              .then(render.showItems);
            break;
          case "Escape":
            $label.classList.toggle("editing");
            break;
        }
      });
    }
  };

  goToRedirectToMain = () => {
    $filters.getElementsByClassName("selected")[0].classList.toggle("selected");
    $filters.querySelector(".all").classList.toggle("selected");
    window.location.replace("/#");
  };

  todolistEventHandler = (e, userId) => {
    const { classList } = e.target;
    const targetId = e.target.closest("li").dataset.id;
    if (classList.contains("destroy")) {
      this.goToRedirectToMain();
      apiService
        .deleteUserTodoOne(userId, targetId)
        .then(() => apiService.getUserTodo(userId))
        .then(render.showItems);
      return;
    }
    if (classList.contains("toggle")) {
      this.goToRedirectToMain();
      apiService
        .toggleUserTodo(userId, targetId)
        .then(() => apiService.getUserTodo(userId))
        .then(render.showItems);
      return;
    }

    if (classList.contains("chip")) {
      const { value } = e.target;
      switch (value) {
        case "1":
          apiService
            .makePriorityUserTodo(userId, targetId, "FIRST")
            .then(() => apiService.getUserTodo(userId))
            .then(render.showItems);
          break;
        case "2":
          apiService
            .makePriorityUserTodo(userId, targetId, "SECOND")
            .then(() => apiService.getUserTodo(userId))
            .then(render.showItems);
          break;
      }
    }
  };

  addNewTodo = (userId, newTodo) => {
    this.goToRedirectToMain();
    apiService
      .addUserTodo(userId, newTodo)
      .then(() => apiService.getUserTodo(userId))
      .then(render.showItems);
  };
}
