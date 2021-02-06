import {
  getUserListByLocalStorage,
  setUserListToLocalStorage,
} from "./LocalStorage.js";

import {
  postUser,
  deleteUser,
  getTodoItems,
  postTodoItem,
  deleteTodoItems,
  deleteTodoItem,
  reviseTodoItem,
  revisePriorityOfTodoItem,
  toggleCompleteOfTodoItem,
} from "./Fetch.js";

export const initUserList = () => {
  const userList = getUserListByLocalStorage();
  const $target = document.querySelector(".user-create-button");

  if (userList) {
    userList.map((user) => {
      addUserBtnToUserList(user, $target);
    });
  }
  const $userCreateBtn = document.querySelector(".user-create-button");
  const $userList = document.getElementById("user-list");
  $userList.addEventListener("click", renderTodoListOfUser);

  $userCreateBtn.addEventListener("click", onUserCreateHandler);
};

const onUserCreateHandler = async ({ target }) => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (!userName) return;
  const user = await postUser(userName);
  addUserBtnToUserList(user, target);
  setUserListToLocalStorage();
};
function addUserBtnToUserList(user, target) {
  const $userBtn = createUserButton(user);

  $userBtn.setAttribute("id", user._id);
  $userBtn.innerText = user.name;

  const $userList = document.getElementById("user-list");

  $userList.insertBefore($userBtn, target);
}
const createUserButton = (user) => {
  const $button = document.createElement("button");
  $button.classList.add("ripple", "userBtn");
  $button.setAttribute("id", user._id);
  $button.innerText = user.name;
  return $button;
};

const renderTodoListOfUser = async ({ target }) => {
  const classes = target.className.split(" ");
  if (!classes.includes("userBtn")) return false;
  const todoList = await getTodoItems(target.id);
  assignTodoList(todoList);
};

const assignTodoList = (todolist) => {};

const createTodoItem = (todolist) => {
  const todoItem = `
    <li>
      <div class="view">
        <input class="toggle" type="checkbox" />
        <label class="label">
          <span class="chip secondary">2순위</span>
           해야할 아이템
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />
    </li>
  `;
};
