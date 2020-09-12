import { createStore } from "./redux.js";

const $app = document.querySelector("#app");

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
};

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);

const store = createStore();
