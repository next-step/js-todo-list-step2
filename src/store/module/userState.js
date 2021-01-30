const userState = (() => {
  const users = [{ name: "eastjun", active: true }];

  const createUser = (name) => {
    const newUser = {
      name,
      active: true,
    };
    users.push(newUser);
    selectUser(newUser);
  };

  const selectUser = (user) => {
    getSelectedUser().active = false;
    user.active = true;
  };

  const getSelectedUser = () => {
    return users.find(({ active }) => active);
  };

  const getUsers = () => {
    return users;
  };

  return {
    createUser,
    selectUser,
    getSelectedUser,
    getUsers,
  };
})();

export default userState;
