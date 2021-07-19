import { createTodoAPI } from "../../api/requests.js";

export const createTodo = async (userId, data) => {
  return await createTodoAPI(userId, data);
};

export const AddedTodos = (newTodo, state) => {
  const { todos, userId } = state;
  const newTodos = todos.map((user) => {
    if (user._id === userId) {
      const newTodoList = [...user.todoList, newTodo];
      return { ...user, todoList: newTodoList };
    }
    return user;
  });
  const newState = {
    ...state,
    todos: newTodos,
  };
  return newState;
};
