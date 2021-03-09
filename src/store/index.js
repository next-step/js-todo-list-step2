import userState from "./module/userState.js";
import todoState from "./module/todoState.js";

const $store = (() => {
  return {
    userState,
    todoState,
  };
})();

export default $store;
