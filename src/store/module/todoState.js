import $api from "../../api/index.js";
import userState from "./userState.js";

const todoState = (() => {
  let selectedUserId = {};
  const subscriber = [];

  const init = async () => {
    const { _id } = userState.getSelectedUser();
    selectedUserId = _id;
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
    getTodos,
    subscribe,
  };
})();

export default todoState;
