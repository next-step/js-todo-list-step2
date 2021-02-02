import user from "./module/user.js";
import todo from "./module/todo.js";
import filter from "./module/filter.js";

const $store = (() => {
  return {
    user,
    todo,
    filter,
  };
})();

export default $store;
