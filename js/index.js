import { initUserList } from "./UserList.js";
import { initTodoList } from "./TodoList.js";
import { setUserListToLocalStorage } from "./LocalStorage.js";
const init = () => {
  window.addEventListener("unload", setUserListToLocalStorage);
  initUserList();
  initTodoList();
};

init();
