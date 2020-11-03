import Store from "./store/Store.js";
import App from "./components/App.js";
import { EVENT, SELECTOR } from "./utils/constant.js";

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
};

const userCreateButton = document.querySelector(".user-create-button");
userCreateButton.addEventListener("click", onUserCreateHandler);

document.addEventListener(EVENT.DOM_LOADED, async () => {
  new App({
    $target: document.querySelector(SELECTOR.TODO_APP),
    store: new Store(),
  });
});
