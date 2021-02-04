import { todoList, MINIMUN_INPUT_LENGTH } from "./AddNewItem.js";
import { ajaxPostFunctions } from "./AjaxPost.js";
import { ajaxDeleteFunctions, ajaxDeleteUser } from "./AjaxDelete.js";
import { ajaxGetFunctions } from "./AjaxGet.js";

export const userList = document.querySelector("#user-list");
export const baseurl = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";
export var currentUserID = "";

const topTitle = document.querySelector("#user-title>span>strong");
const deletebutton = document.querySelector(".clear-completed");

export const initControlUserList = () => {
  userList.addEventListener("click", onUserCreateHandler);
  userList.addEventListener("click", setCurrentUser);
  userList.addEventListener("click", ajaxDeleteUser);
  deletebutton.addEventListener("click", ajaxDeleteFunctions);
};

const setCurrentUser = ({ target }) => {
  if (target.classList.contains("user-create-button")) return;
  if (!target.classList.contains("ripple")) return;

  const users = document.querySelectorAll("#user-list>.ripple");
  users.forEach((user) => {
    if (user.classList.contains("active")) user.classList.remove("active");
  });

  target.classList.add("active");

  currentUserID = target.getAttribute("id");
  ajaxGetFunctions("useritems");
  topTitle.innerText = target.innerText;
  todoList.innerHTML = "";
};

const onUserCreateHandler = ({ target }) => {
  if (!target.classList.contains("user-create-button")) return;

  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  if (userName === null) return;
  else if (userName.length < MINIMUN_INPUT_LENGTH) {
    alert(`${MINIMUN_INPUT_LENGTH} 글자 이상 입력해주세요!`);
    return;
  }
  const userTemplate = document.createElement("button");
  userTemplate.classList.add("ripple");
  userTemplate.innerText = userName;

  ajaxPostFunctions(userName, "username");
};
