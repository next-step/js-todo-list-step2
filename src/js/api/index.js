import requestParams from './requestData.js';

export const defaultErrorMessage = '잠시 후 다시 시도해주세요';

const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const request = async (endPoint, option = {}) => {
  const response = await fetch(baseUrl + endPoint, option);
  const data = await response.json();
  if (response.status !== 200 || !response.ok) {
    throw data.message || defaultErrorMessage;
  }
  return data;
};

const api = {
  getUserList: async () => {
    const { endPoint, option } = requestParams.getUserList();
    return await request(endPoint, option);
  },

  getUser: async (userId) => {
    const { endPoint, option } = requestParams.getUser(userId);
    return await request(endPoint, option);
  },

  addUser: async (name) => {
    const { endPoint, option } = requestParams.addUser(name);
    return await request(endPoint, option);
  },

  removeUser: async (userId) => {
    const { endPoint, option } = requestParams.removeUser(userId);
    return await request(endPoint, option);
  },

  addTodoItem: async (userId, contents) => {
    const { endPoint, option } = requestParams.addTodoItem(userId, contents);
    return await request(endPoint, option);
  },

  updateTodo: async (userId, itemId, contents) => {
    const { endPoint, option } = requestParams.updateTodo(
      userId,
      itemId,
      contents,
    );
    return await request(endPoint, option);
  },

  removeTodo: async (userId, itemId) => {
    const { endPoint, option } = requestParams.removeTodo(userId, itemId);
    return await request(endPoint, option);
  },
  removeAllTodos: async (userId) => {
    const { endPoint, option } = requestParams.removeAllTodos(userId);
    return await request(endPoint, option);
  },
  setTodoPriority: async (userId, itemId, priority) => {
    const { endPoint, option } = requestParams.setTodoPriority(
      userId,
      itemId,
      priority,
    );
    return await request(endPoint, option);
  },
  toggleTodoComplete: async (userId, itemId) => {
    const { endPoint, option } = requestParams.toggleTodoComplete(
      userId,
      itemId,
    );
    return await request(endPoint, option);
  },
};

export default api;
