import $api from "../../api/index.js";
import watch from "../../utils/watch.js";

const user = (() => {
  let selected = {};

  const init = async () => {
    const users = await user.getAll();
    selected = users[0];
  };

  const mapUser = (user) => {
    return {
      ...user,
      active: user._id === selected._id,
    };
  };

  const getAll = async () => {
    const users = await $api.user.getAll();
    return users.map(mapUser);
  };

  const create = async (name) => {
    const user = await $api.user.create({ name });
    return mapUser(user);
  };

  const deleteUser = async (id) => {
    await $api.user.delete(id);
    const users = await getAll();
    selected = users[0];
    publish();
  };

  const setSelected = (value) => {
    selected = value;
    publish();
  };

  const getSelected = () => {
    return selected;
  };

  const getSelectedId = () => {
    return selected._id;
  };

  const getSelectedName = () => {
    return selected.name;
  };

  const subscribe = (method) => {
    watch.subscribe("user", method);
  };

  const publish = () => {
    watch.publish("user");
  };

  return {
    init,
    getAll,
    create,
    delete: deleteUser,
    subscribe,
    setSelected,
    getSelected,
    getSelectedId,
    getSelectedName,
  };
})();

export default user;
