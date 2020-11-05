export const filterActiveTodoUsers = todos => {
  return todos.filter(todo => todo);
};

export const filterActiveUserTodos = (todos, id) => {
  return todos.filter(todo => todo._id === id)[0].todoList;
};

export const changeUserData = (id, userList, renewPersonalUser) => {
  return userList.map(user => {
    if (user._id !== id) return user;
    else return renewPersonalUser;
  });
};
