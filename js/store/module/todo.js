import $api from "../../api/index.js";
import user from "./user.js";

const todo = (() => {
  return {
    async getAll() {
      const selectedId = await user.getSelectedId();
      return await $api.todo.getAll(selectedId);
    },
  };
})();

export default todo;
