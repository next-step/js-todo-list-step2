export const updateUserTodos = (newUserTodos, state, userId, userName) => {
  const { todos } = state;
  const newTodos = todos.map((user) => {
    return user._id === userId ? { ...user, todoList: newUserTodos } : user;
  });
  const newState = {
    ...state,
    todos: newTodos,
    userId,
    userName,
  };
  return newState;
};

export const buildTodos = (state) => {
  const { todos, userId } = state;
  const newTodos = todos.filter((user) => {
    return user._id === userId ? false : true;
  });
  const newState = {
    ...state,
    todos: [...newTodos],
    userName: newTodos[0].name,
    userId: newTodos[0]._id,
  };
  return newState;
};
