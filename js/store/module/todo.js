import $api from "../../api/index.js";
import user from "./user.js";
import watch from "../../utils/watch.js";

const todo = (() => {
  const getAll = async () => {
    const selectedId = await user.getSelectedId();
    return await $api.todo.getAll(selectedId);
  };

  const create = async (contents) => {
    const selectedId = await user.getSelectedId();
    const newTodo = await $api.todo.create(selectedId, { contents });
    publish();
    return newTodo;
  };

  const deleteTodo = async (todoId) => {
    const selectedId = await user.getSelectedId();
    const deletedTodo = await $api.todo.delete(selectedId, todoId);
    publish();
    return deletedTodo;
  };

  const deleteAll = async () => {
    const selectedId = await user.getSelectedId();
    await $api.todo.deleteAll(selectedId);
    publish();
  };

  const subscribe = (method) => {
    watch.subscribe(todo, method);
  };

  const publish = () => {
    watch.publish(todo);
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
