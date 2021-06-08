import $api from '../api/index.js'
import user from './user.js';


const todo = (() => {
  let selectedUserId;

  const init = async () => {
    const selectedUser = await user.getSelected();
    selectedUserId = selectedUser._id;
    return selectedUserId;
  };

  const getAll = async () => {
    return await $api.todo.getAll(selectedUserId);
  };

  const create = async (contents) => {
    const todos = await $api.todo.create(selectedUserId, { contents });
    return todos;
  };

  const deleteTodo = async (todoId) => {
    const todos = await $api.todo.remove(selectedUserId, todoId);
    return todos;
  };

  const deleteAll = async () => {
    const todos = await $api.todo.remove(selectedUserId);
    return todos;
  };

  const toggle = async (todoId) => {
    const todos = await $api.todo.toggle(selectedUserId, todoId);
    return todos;
  };

  const edit = async (todoId, contents) => {
    const todos = await $api.todo.update(selectedUserId, todoId, {contents});
    return todos;
  };

  const setPriority = async (todoId, contents) => {
    const todos = await $api.todo.priority(selectedUserId, todoId, {contents})
    return todos;
  };

  return {
    init,
    getAll,
    create,
    deleteTodo,
    deleteAll,
    toggle,
    edit,
    setPriority
  }
})();

export default todo; 