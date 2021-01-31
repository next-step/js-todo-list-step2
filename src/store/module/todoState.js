import $api from "../../api/index.js";
import userState from "./userState.js";

const todoState = (() => {
  let selectedUserId = {};
  const subscriber = [];

  const init = async () => {
    userState.subscribe(setSelectedUserId);
    await setSelectedUserId();
  };

  const setSelectedUserId = async () => {
    const { _id } = userState.getSelectedUser();
    selectedUserId = _id;
  };

  const createTodo = async (contents) => {
    await $api.todo.create(selectedUserId, { contents });
    publish();
  };

  const toggleTodo = async (id) => {
    await $api.todo.toggle(selectedUserId, id);
    publish();
  };

  const deleteTodo = async (id) => {
    await $api.todo.delete(selectedUserId, id);
    publish();
  };

  const deleteAllTodo = async () => {
    await $api.todo.deleteAll(selectedUserId);
    publish();
  };

  const editTodo = async (id, contents) => {
    await $api.todo.edit(selectedUserId, id, { contents });
    publish();
  };

  const getTodos = async () => {
    return await $api.todo.getAll(selectedUserId);
  };

  const subscribe = (method) => {
    subscriber.push(method);
  };

  const publish = () => {
    subscriber.forEach(async (method) => await method());
  };

  return {
    init,
    createTodo,
    toggleTodo,
    deleteTodo,
    deleteAllTodo,
    editTodo,
    getTodos,
    subscribe,
  };
})();

export default todoState;
