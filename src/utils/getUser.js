import { API } from '../api/api.js';

export const getUser = (userId) => {
  const userTodos = API.getUserTodos(userId);

  userTodos.then((todos) => console.log(todos));
};
