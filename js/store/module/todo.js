import $api from "../../api/index.js";
import user from "./user.js";
import watch from "../../utils/watch.js";

const todo = (() => {
  let selectedUserId;

  const init = async () => {
    selectedUserId = user.getSelectedId();
    user.subscribe(() => (selectedUserId = user.getSelectedId()));
  };

  const getAll = async () => {
    return await $api.todo.getAll(selectedUserId);
  };

  const create = async (contents) => {
    const newTodo = await $api.todo.create(selectedUserId, { contents });
    publish();
    return newTodo;
  };

  const deleteTodo = async (todoId) => {
    const deletedTodo = await $api.todo.delete(selectedUserId, todoId);
    publish();
    return deletedTodo;
  };

  const deleteAll = async () => {
    await $api.todo.deleteAll(selectedUserId);
    publish();
  };

  const toggle = async (todoId) => {
    await $api.todo.toggle(selectedUserId, todoId);
    publish();
  };

  const edit = async (todoId, contents) => {
    const editedTodo = await $api.todo.edit(selectedUserId, todoId, {
      contents,
    });
    console.log(editedTodo);
    publish();
    return editedTodo;
  };

  const subscribe = (method) => {
    watch.subscribe("todo", method);
  };

  const publish = () => {
    watch.publish("todo");
  };

  return {
    init,
    getAll,
    create,
    delete: deleteTodo,
    deleteAll,
    toggle,
    edit,
    subscribe,
  };
})();

export default todo;
