import { createTodoAPI } from "../../api/requests.js";

export const createTodo = async (userId, data) => {
  return await createTodoAPI(userId, data);
};

export const AddTodos = (newTodo, state) => {
  const { users, userId } = state;
  const newUsers = users.map((user) => {
    if (user._id === userId) {
      const newTodoList = [...user.todoList, newTodo];
      return { ...user, todoList: newTodoList };
    }
    return user;
  });
  const newState = {
    ...state,
    users: newUsers,
  };
  return newState;
};
