export const deleteAllTodos = (state) => {
  const { todos, userId } = state;
  const newTodos = todos.map((user) => {
    return user._id === userId ? { ...user, todoList: [] } : user;
  });
  const newState = { ...state, todos: newTodos };
  return newState;
};
