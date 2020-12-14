import $api from "../../api/index.js";
import user from "./user.js";

const todo = (() => {
  let todos = [];

  return {
    get todos() {
      return todos;
    },
    set todos(value) {
      todos = value;
      this.watch.todos.forEach((method) => method());
    },

    subscribe(target, method) {
      if (!this["watch"]) {
        this["watch"] = {};
      }
      if (!this["watch"][target]) {
        this.watch[target] = [method];
      }
      this.watch[target].push(method);
    },

    async getAll() {
      const selectedId = await user.getSelectedId();
      todos = await $api.todo.getAll(selectedId);
      return todos;
    },

    async create(contents) {
      const selectedId = await user.getSelectedId();
      const newTodo = await $api.todo.create(selectedId, { contents });

      todos.push(newTodo);
      this.todos = todos;

      return newTodo;
    },

    async delete(todoId) {
      const selectedId = await user.getSelectedId();
      const deletedTodo = await $api.todo.delete(selectedId, todoId);

      todo.todos = await $api.todo.getAll(selectedId);

      return deletedTodo;
    },

    async deleteAll() {
      const selectedId = await user.getSelectedId();
      await $api.todo.deleteAll(selectedId);
      todo.todos = [];
    },
  };
})();

export default todo;
