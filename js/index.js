import TodoApp from "./components/TodoApp.js";

const appEl = document.querySelector("#app");
new TodoApp(appEl).render();

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
};

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);
