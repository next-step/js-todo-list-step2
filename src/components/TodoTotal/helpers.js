export const countTodosLength = (users, userId) => {
  let count = 0;
  users.forEach((user) => {
    if (user._id === userId) count = user.todoList.length;
  });
  return count;
};
