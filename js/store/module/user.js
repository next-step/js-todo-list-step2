import $api from "../../api/index.js";
import watch from "../../utils/watch.js";

const user = (() => {
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

  const setSelected = (value) => {
    selected = value;
    publish();
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

  const subscribe = (method) => {
    watch.subscribe(user, method);
  };

  const publish = () => {
    watch.publish(user);
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
