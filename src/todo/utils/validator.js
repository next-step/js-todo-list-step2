export const filterActiveTodoUsers = todos => {
  return todos.filter(todo => todo.todoList.length);
};

export const filterActiveUserTodos = (todos, id) => {
  return todos.filter(todo => todo._id === id)[0].todoList;
};
