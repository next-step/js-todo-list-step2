export const countTodosLength = (todos, userId) => {
  let count = 0;
  todos.forEach((user) => {
    if (user._id === userId) count = user.todoList.length;
  });
  return count;
};
