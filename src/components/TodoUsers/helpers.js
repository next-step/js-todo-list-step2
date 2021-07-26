export const updateUserTodos = (newUserTodos, state, userId, userName) => {
  const { users } = state;
  const newUsers = users.map((user) => {
    return user._id === userId ? { ...user, todoList: newUserTodos } : user;
  });
  const newState = {
    ...state,
    users: newUsers,
    userId,
    userName,
  };
  return newState;
};

export const buildTodos = (state) => {
  const { users, userId } = state;
  const newUsers = users.filter((user) => {
    return user._id === userId ? false : true;
  });
  const newState = {
    ...state,
    users: [...newUsers],
    userName: newUsers[0].name,
    userId: newUsers[0]._id,
  };
  return newState;
};
