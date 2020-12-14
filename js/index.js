import App from "./App.js";
import $store from "./store/index.js";

const init = async () => {
  await $store.user.init();
  new App("#app");
};

init();
