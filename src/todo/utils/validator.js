export const mapTodoUsers = todos => {
  return todos.map(todo => {
    if (!todo.isEditing) todo.isEditing = false;
    return todo;
  });
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
