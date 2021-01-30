const userState = (() => {
  const users = [{ name: "eastjun", active: true }];
  const subscriber = [];

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
    publish();
  };

  const getSelectedUser = () => {
    return users.find(({ active }) => active);
  };

  const getUsers = () => {
    return users;
  };

  const subscribe = (method) => {
    subscriber.push(method);
  };

  const publish = () => {
    subscriber.forEach((method) => method());
  };

  return {
    createUser,
    selectUser,
    getSelectedUser,
    getUsers,
    subscribe,
  };
})();

export default userState;
