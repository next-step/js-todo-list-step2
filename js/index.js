import Store from "./store/Store.js";
import App from "./components/App.js";
import { EVENT, SELECTOR } from "./utils/constant.js";

document.addEventListener(EVENT.DOM_LOADED, async () => {
  new App({
    $target: document.querySelector(SELECTOR.TODO_APP),
    store: new Store(),
  });
});
