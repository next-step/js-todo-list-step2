import $api from "../../api/index.js";

const user = (() => {
  let selectedUser = {};

  const mapUser = (user) => {
    return {
      ...user,
      active: user._id === selectedUser._id,
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

  return {
    getAll,
    create,
  };
})();

export default user;
