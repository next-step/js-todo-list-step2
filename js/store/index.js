import user from "./module/user.js";
import todo from "./module/todo.js";

const $store = (() => {
  return {
    user,
    todo,
  };
})();

export default $store;
