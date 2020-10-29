import User from "./client/user.js";

const apiService = new User();

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  apiService
    .addUser(userName)
    .then(() => apiService.fetchUsers())
    .then(showUsers);
};

/**
 * 유저 목록을 보여준다
 * @param {Array} users
 */

const $userList = document.querySelector("#user-list");

const showUsers = (users) => {
  const usersName =
    users
      .sort((a, b) => (a.name > b.name ? -1 : 1))
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
const showItems = (contents) => {
  const userTodos = contents
    .map(
      (todo) =>
        `<li>
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

$userList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("showTodo")) {
    return;
  }
  const eId = e.target.dataset.id;
  apiService.fetchUserTodo(eId).then(showItems);
});

{
  /* <div id="user-list">
  <button class="ripple active">eastjun</button>
  <button class="ripple">westjun</button>
  <button class="ripple">southjun</button>
  <button class="ripple">northjun</button>
  <button class="ripple">hojun</button>
  <button class="ripple user-create-button">+ 유저 생성</button>
</div>; */
}
