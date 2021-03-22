import App from "./App.js";
import $store from "./store/index.js";

const init = async () => {
  await $store.user.init();
  $store.filter.init();
  await $store.todo.init();
  new App("#app");
};

init();
