export const deletedTodos = (deletedTodo, state) => {
  const { users, userId } = state;
  const newUsers = users.map((user) => {
    return user._id === userId ? deletedTodo : user;
  });
  const newState = { ...state, users: [...newUsers] };
  return newState;
};

export const updateTodos = (newTodo, state) => {
  const { users, userId } = state;
  const newUsers = users.map((user) => {
    if (user._id === userId) {
      const newTodoList = user.todoList.map((todo) => {
        return todo._id === newTodo._id ? newTodo : todo;
      });
      return { ...user, todoList: newTodoList };
    }
    return user;
  });
  const newState = { ...state, users: [...newUsers] };
  return newState;
};

export const filterTodos = (state) => {
  const { users, userId, filter } = state;

  const currentUsers = users.reduce((prev, user) => {
    return user._id === userId ? user.todoList : prev;
  }, []);

  if (filter === "all") return currentUsers;
  const filteredUsers = currentUsers.filter((todo) => {
    if (filter === "active") return todo.isCompleted ? false : true;
    if (filter === "completed") return todo.isCompleted ? true : false;
  });
  return filteredUsers;
};
