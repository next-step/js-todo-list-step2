import UserService from "./client/userService.js";
import Render from "./components/render.js";
import SelectedUser from "./components/selectedUser.js";

const apiService = new UserService();
const render = new Render();
const selectedUser = new SelectedUser();

//Btns from DOM
const $userList = document.querySelector("#user-list");
const $deleteAllTodosBtn = document.querySelector(".clear-completed");
const $input = document.querySelector(".new-todo");
const $todoUl = document.querySelector(".todo-list");

//initial Render
apiService.fetchUsers().then(render.showUsers);

//click one user
$userList.addEventListener("click", (e) => {
  if (!e.target.classList.contains("showTodo")) {
    return;
  }
  //혹시 toggle 기존 active 삭제하는 추천방법 있으면 부탁드릴게요!🙏
  if ($userList.getElementsByClassName("active").length > 0) {
    $userList.getElementsByClassName("active")[0].classList.remove("active");
  }
  e.target.classList.toggle("active");
  const userId = e.target.dataset.id;
  selectedUser.selectedUserState(userId);
});
