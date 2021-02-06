import { initUserList } from "./UserList.js";
import { setUserListToLocalStorage } from "./LocalStorage.js";
const init = () => {
  window.addEventListener("unload", setUserListToLocalStorage);
  initUserList();
};

init();
