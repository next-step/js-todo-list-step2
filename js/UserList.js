import {
  getUserListByLocalStorage,
  setUserListToLocalStorage,
} from "./LocalStorage.js";

import { postUser } from "./Fetch.js";

export const initUserList = () => {
  const userList = getUserListByLocalStorage();
  const userCreateBtn = document.querySelector(".user-create-button");
  const userListDIV = document.getElementById("user-list");

  userCreateBtn.addEventListener("click", onUserCreateHandler);
};

const onUserCreateHandler = async ({ target }) => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  const user = await postUser(userName);
  const userBtn = createUserButton(user);
  userBtn.setAttribute("id", user._id);
  userBtn.innerText = user.name;

  const userListDIV = document.getElementById("user-list");

  userListDIV.insertBefore(userBtn, target);
};

const createUserButton = (user) => {
  const button = document.createElement("button");
  button.classList.add("ripple", "userBtn");

  button.setAttribute("id", user.id);
  button.innerText = user.name;

  return button;
};
