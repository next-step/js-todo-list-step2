import $api from "../../api/index.js";

const user = (() => {
  const watch = {};
  let selected = {};

  const mapUser = (user) => {
    return {
      ...user,
      active: user._id === selected._id,
    };
  };

  const getAll = async () => {
    const users = await $api.user.getAll();
    if (!selected._id) {
      selected = users[0];
    }

    return users.map(mapUser);
  };

  const create = async (name) => {
    const user = await $api.user.create({ name });
    return mapUser(user);
  };

  const subscribe = (target, method) => {
    if (!watch[target]) {
      watch[target] = [method];
    }
    watch[target].push(method);
  };

  const setSelected = (value) => {
    selected = value;
    watch.selected.forEach(async (method) => await method());
  };

  const getSelected = async () => {
    if (!selected._id) {
      const users = await getAll();
      selected = users[0];
    }
    return selected;
  };

  const getSelectedId = async () => {
    const { _id } = await getSelected();
    return _id;
  };

  const getSelectedName = async () => {
    const { name } = await getSelected();
    return name;
  };

  return {
    getAll,
    create,
    subscribe,
    setSelected,
    getSelected,
    getSelectedId,
    getSelectedName,
  };
})();

export default user;
