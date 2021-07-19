export const deletedTodos = (deletedTodo, state) => {
  const { todos, userId } = state;
  const newTodos = todos.map((user) => {
    return user._id === userId ? deletedTodo : user;
  });
  const newState = { ...state, todos: [...newTodos] };
  return newState;
};

export const updateTodos = (newTodo, state) => {
  const { todos, userName, userId } = state;
  const newTodos = todos.map((user) => {
    if (user._id === userId) {
      const newTodoList = user.todoList.map((todo) => {
        return todo._id === newTodo._id ? newTodo : todo;
      });
      return { ...user, todoList: newTodoList };
    }
    return user;
  });
  const newState = { ...state, todos: [...newTodos] };
  return newState;
};

export const currentTodos = (state) => {
  const { todos, userId, filter } = state;

  const curUserTodos = todos.reduce((prev, user) => {
    return user._id === userId ? user.todoList : prev;
  }, []);

  if (filter === "all") return curUserTodos;
  const filteredTodos = curUserTodos.filter((todo) => {
    if (filter === "active") return todo.isCompleted ? false : true;
    if (filter === "completed") return todo.isCompleted ? true : false;
  });
  return filteredTodos;
};
