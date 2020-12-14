import $api from "../../api/index.js";
import user from "./user.js";

const todo = (() => {
  const watch = {};

  const getAll = async () => {
    const selectedId = await user.getSelectedId();
    return await $api.todo.getAll(selectedId);
  };

  const create = async (contents) => {
    const selectedId = await user.getSelectedId();
    const newTodo = await $api.todo.create(selectedId, { contents });
    publish("todos");
    return newTodo;
  };

  const deleteTodo = async (todoId) => {
    const selectedId = await user.getSelectedId();
    const deletedTodo = await $api.todo.delete(selectedId, todoId);
    publish("todos");
    return deletedTodo;
  };

  const deleteAll = async () => {
    const selectedId = await user.getSelectedId();
    await $api.todo.deleteAll(selectedId);
    publish("todos");
  };

  const subscribe = (target, method) => {
    if (!watch[target]) {
      watch[target] = [method];
    }
    watch[target].push(method);
  };

  const publish = (target) => {
    watch[target].forEach(async (method) => await method());
  };

  return {
    getAll,
    create,
    delete: deleteTodo,
    deleteAll,
    subscribe,
  };
})();

export default todo;
