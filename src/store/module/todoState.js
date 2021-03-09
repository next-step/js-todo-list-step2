import $api from "../../api/index.js";
import userState from "./userState.js";

import { FILTER } from "../../utils/constants.js";

const todoState = (() => {
  let selectedUserId = {};
  let selectedFilter = FILTER.ALL;
  const subscriber = [];

  const init = async () => {
    userState.subscribe(setSelectedUserId);
    await setSelectedUserId();
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

  const setPriority = async (id, priority) => {
    await $api.todo.priority(selectedUserId, id, { priority });
    publish();
  };

  const setSelectedUserId = async () => {
    const { _id } = userState.getSelectedUser();
    selectedUserId = _id;
    publish();
  };

  const setSelectedFilter = (filter) => {
    selectedFilter = filter;
    publish();
  };

  const getSelectedFilter = () => {
    return selectedFilter;
  };

  const getFilteredTodos = async () => {
    const todos = await getTodos();
    if (selectedFilter === FILTER.ACTIVE) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (selectedFilter === FILTER.COMPLETED) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
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
    setPriority,
    setSelectedFilter,
    getSelectedFilter,
    getFilteredTodos,
    getTodos,
    subscribe,
  };
})();

export default todoState;
