export const filterActiveTodoUsers = todos => {
  return todos.filter(todos => todos.todoList.length);
};
