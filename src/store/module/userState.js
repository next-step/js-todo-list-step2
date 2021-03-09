import $api from "../../api/index.js";

const userState = (() => {
  let selected = {};
  const subscriber = [];

  const init = async () => {
    const users = await $api.user.getAll();
    selected = users[0];
  };

  const mapToUser = (user) => {
    return {
      ...user,
      active: user._id === selected._id,
    };
  };

  const createUser = async (name) => {
    const user = await $api.user.create({ name });
    return mapToUser(user);
  };

  const selectUser = (user) => {
    selected = user;
    publish();
  };

  const deleteUser = async (id) => {
    await $api.user.delete(id);
    const users = await getUsers();
    selectUser(users[0]);
  };

  const getSelectedUser = () => {
    return selected;
  };

  const getUsers = async () => {
    const users = await $api.user.getAll();
    return users.map(mapToUser);
  };

  const subscribe = (method) => {
    subscriber.push(method);
  };

  const publish = () => {
    subscriber.forEach(async (method) => await method());
  };

  return {
    init,
    createUser,
    selectUser,
    deleteUser,
    getSelectedUser,
    getUsers,
    subscribe,
  };
})();

export default userState;
