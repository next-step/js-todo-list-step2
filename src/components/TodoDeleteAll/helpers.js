export const deleteAllTodos = (state) => {
  const { users, userId } = state;
  const newUsers = users.map((user) => {
    return user._id === userId ? { ...user, todoList: [] } : user;
  });
  const newState = { ...state, users: newUsers };
  return newState;
};
