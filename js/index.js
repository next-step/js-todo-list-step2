import UserService from "./client/userService.js";

const apiService = new UserService();

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  apiService
    .addUser(userName)
    .then(() => apiService.fetchUsers())
    .then(showUsers);
};

//Btns from DOM
const $userList = document.querySelector("#user-list");
const $deleteAllTodosBtn = document.querySelector(".clear-completed");
const $input = document.querySelector(".new-todo");

const showUsers = (users) => {
  const usersName =
    users
      .map(
        (user) =>
          `<button data-id="${user._id}" class="ripple showTodo">${user.name}</button>`
      )
      .join("") +
    `<button class="ripple user-create-button">+ 유저 생성</button>`;
  $userList.innerHTML = usersName;

  const userCreateButton = document.querySelector(".user-create-button");
  userCreateButton.addEventListener("click", onUserCreateHandler);
};
const $todoUl = document.querySelector(".todo-list");
apiService.fetchUsers().then(showUsers);

const todolistEventHandler = (e, eId) => {
  const { className } = e.target;
  console.log(className);
  switch (className) {
    case "destroy":
      const targetId = e.target.closest("li").dataset.id;
      apiService
        .deleteUserTodoOne(eId, targetId)
        .then(() => apiService.fetchUserTodo(eId))
        .then(showItems);
      return;
    case "toggle":
      return;
  }
};

const showItems = (todos) => {
  const userTodos = todos
    .map(
      (todo) =>
        `<li data-id="${todo._id}">
           <div class="view">
            <input class="toggle" type="checkbox" />
            <label class="label">
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>
              ${todo.contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="완료된 타이틀" />
        </li>`
    )
    .join("");
  $todoUl.innerHTML = userTodos;

  const userCreateButton = document.querySelector(".user-create-button");
  userCreateButton.addEventListener("click", onUserCreateHandler);
};

const addNewTodo = (eId, newTodo) => {
  apiService
    .addUserTodo(eId, newTodo)
    .then(() => apiService.fetchUserTodo(eId))
    .then(showItems);
};

const deleteAllTodos = (eId) => {
  console.log("delete all");
  apiService
    .deleteUserTodosAll(eId)
    .then(() => apiService.fetchUserTodo(eId))
    .then(showItems);
};

//selectedUser
const selectedUserState = (eId) => {
  apiService.fetchUserTodo(eId).then(showItems);
  $input.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") return;
    if (e.key === "Enter") {
      addNewTodo(eId, $input.value);
      $input.value = "";
    }
  });
  $deleteAllTodosBtn.addEventListener("click", () => deleteAllTodos(eId));
  $todoUl.addEventListener("click", (e) => todolistEventHandler(e, eId));
};

//click one user
$userList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("showTodo")) {
    return;
  }
  const eId = e.target.dataset.id;
  selectedUserState(eId);
});
