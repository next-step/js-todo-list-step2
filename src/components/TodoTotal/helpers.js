export const countTodosLength = (users, userId) => {
  if (users.length) {
    const user = users.find((user) => user._id === userId);
    return user.todoList.length;
  }
};
