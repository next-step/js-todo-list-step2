import { createStore } from "./redux.js";
import App from "./components/App.js";
import { getUserList } from "./api/users.js";

const app = new App(document.querySelector("#app"));

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
};

const userCreateButton = document.querySelector(".user-create-button");

const store = createStore();
