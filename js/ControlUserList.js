import { todoList } from "./AddNewItem.js";
import { ajaxDeleteUser, ajaxDeleteAllItem, ajaxPostFunctions } from "./AjaxPost.js";
import { ajaxGetFunctions } from "./AjaxGet.js";

const userList = document.querySelector("#user-list");
const topTitle = document.querySelector("#user-title>span>strong");
const deletebutton = document.querySelector(".clear-completed");

export var currentUserID = "";

export const initControlUserList = () => {
  userList.addEventListener("click", onUserCreateHandler);
  userList.addEventListener("click", setCurrentUser);
  userList.addEventListener("click", ajaxDeleteUser);
  deletebutton.addEventListener("click", ajaxDeleteAllItem);
};

const setCurrentUser = ({ target }) => {
  if (target.classList.contains("user-create-button")) return;
  if (!target.classList.contains("ripple")) return;

  const users = document.querySelectorAll("#user-list>.ripple");

  for (let i = 0; i < users.length; i++) {
    if (users[i].classList.contains("active"))
      users[i].classList.remove("active");
  }

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
  else if (userName.length === 1) {
    alert("두 글자 이상 입력해주세요!");
    return;
  }
  const userTemplate = document.createElement("button");
  userTemplate.classList.add("ripple");
  userTemplate.innerText = userName;

  ajaxPostFunctions(userName, "username");
};