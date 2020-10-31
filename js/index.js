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

const todolistEventHandler = (e, userId) => {
  const { classList } = e.target;
  const targetId = e.target.closest("li").dataset.id;
  if (classList.contains("destroy")) {
    apiService
      .deleteUserTodoOne(userId, targetId)
      .then(() => apiService.fetchUserTodo(userId))
      .then(showItems);
    return;
  }
  if (classList.contains("toggle")) {
    apiService
      .toggleUserTodo(userId, targetId)
      .then(() => apiService.fetchUserTodo(userId))
      .then(showItems);
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
        .then(showItems);
      return;
    }
    if (value === "2") {
      const priorityValue = "SECOND";
      apiService
        .makePriorityUserTodo(userId, targetId, priorityValue)
        .then(() => apiService.fetchUserTodo(userId))
        .then(showItems);
      return;
    }
  }
};

const todoEditHandler = (e, userId) => {
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
          .then(showItems);
        return;
      }
      if (e.key === "Escape") {
        $label.classList.toggle("editing");
        return;
      }
    });
  }
};

const priorityTag = (priority) => {
  if (priority === "FIRST") {
    return `<span class="chip primary">1순위</span>`;
  }
  if (priority === "SECOND") {
    return `<span class="chip secondary">2순위</span>`;
  }
  return;
};
const showItems = (todos) => {
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
                 : priorityTag(todo.priority)
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

  const userCreateButton = document.querySelector(".user-create-button");
  userCreateButton.addEventListener("click", onUserCreateHandler);
};

const addNewTodo = (userId, newTodo) => {
  apiService
    .addUserTodo(userId, newTodo)
    .then(() => apiService.fetchUserTodo(userId))
    .then(showItems);
};

const deleteAllTodos = (userId) => {
  console.log("delete all");
  apiService
    .deleteUserTodosAll(userId)
    .then(() => apiService.fetchUserTodo(userId))
    .then(showItems);
};

//selectedUser
const selectedUserState = (userId) => {
  apiService.fetchUserTodo(userId).then(showItems);
  $input.addEventListener("keypress", (e) => {
    if (e.key !== "Enter") return;
    if (e.key === "Enter") {
      addNewTodo(userId, $input.value);
      $input.value = "";
    }
  });
  $deleteAllTodosBtn.addEventListener("click", () => deleteAllTodos(userId));
  $todoUl.addEventListener("click", (e) => todolistEventHandler(e, userId));
  $todoUl.addEventListener("dblclick", (e) => todoEditHandler(e, userId));
};

//click one user
$userList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("showTodo")) {
    return;
  }
  const userId = e.target.dataset.id;
  selectedUserState(userId);
});
