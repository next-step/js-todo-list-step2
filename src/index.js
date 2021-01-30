import App from "./App.js";
import $store from "./store/index.js";

const init = async () => {
  await $store.userState.init();

  const app = document.querySelector("#app");
  app.appendChild(new App());
};

init();
