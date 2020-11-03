import UserService from "../client/userService.js";
const apiService = new UserService();

const $userList = document.querySelector("#user-list");
const $todoUl = document.querySelector(".todo-list");
const $count = document.querySelector(".todo-count");

export default class Render {
  onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    apiService
      .addUser(userName)
      .then(() => apiService.getUsers())
      .then(this.showUsers);
  };

  showUsers = (users) => {
    const usersName =
      users
        .map(
          (user) =>
            `<button data-id="${user._id}" class="ripple showTodo">${user.name}</button>`
        )
        .join("") +
      `<button class="ripple user-create-button">+ 유저 생성</button>
      <div class="to-make-deleteBtn"></div>`;

    $userList.innerHTML = usersName;

    const userCreateButton = document.querySelector(".user-create-button");
    userCreateButton.addEventListener("click", this.onUserCreateHandler);
  };

  priorityTag = (priority) => {
    if (priority === "FIRST") {
      return `<span class="chip primary">1순위</span>`;
    }
    if (priority === "SECOND") {
      return `<span class="chip secondary">2순위</span>`;
    }
    return;
  };

  showItems = (todos) => {
    const userTodos = todos
      .map(
        (todo) =>
          `<li class=${todo.isCompleted ? "completed" : "view"} data-id="${
            todo._id
          }">
           <div class="view">
            <input class="toggle" type="checkbox" ${
              todo.isCompleted ? "checked" : ""
            } />
            <label class="label">
             ${
               todo.priority === "NONE"
                 ? `<select class="chip select">
               <option value="0" selected>
                 순위
               </option>
               <option value="1">1순위</option>
               <option value="2">2순위</option>
             </select>`
                 : this.priorityTag(todo.priority)
             }
              ${todo.contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${todo.contents}" />
        </li>`
      )
      .join("");
    $todoUl.innerHTML = userTodos;

    const $countNum = $count.querySelector("strong");
    $countNum.innerHTML = todos.length;

    const userCreateButton = document.querySelector(".user-create-button");
    userCreateButton.addEventListener("click", this.onUserCreateHandler);
  };
}
