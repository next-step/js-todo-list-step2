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

  return {
    getAll,
  };
})();

export default user;
