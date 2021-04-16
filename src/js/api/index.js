import requestData from './requestData.js';

export const defaultErrorMessage = '잠시 후 다시 시도해주세요';

const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const errorResponse = (message) => {
  return {
    isError: true,
    errorMessage: message || defaultErrorMessage,
  };
};

const successResponse = (data) => {
  return {
    isError: false,
    data,
  };
};

const request = async (endPoint, option) => {
  try {
    console.log(option);
    const response = await fetch(baseUrl + endPoint, option);
    const data = await response.json();
    if (response.status !== 200 || !response.ok) {
      throw { message: data.message };
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const api = {
  getUserList: async () => {
    try {
      const { endPoint, option } = requestData.getUserList();
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  getUser: async (userId) => {
    try {
      const { endPoint, option } = requestData.getUser(userId);
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  addUser: async (name) => {
    try {
      const { endPoint, option } = requestData.addUser(name);
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  removeUser: async (userId) => {
    try {
      const { endPoint, option } = requestData.removeUser(userId);
      await request(endPoint, option);
      return successResponse();
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  addTodoItem: async (userId, contents) => {
    try {
      const { endPoint, option } = requestData.addTodoItem(userId, contents);
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  updateTodo: async (userId, itemId, contents) => {
    try {
      const { endPoint, option } = requestData.updateTodo(
        userId,
        itemId,
        contents,
      );
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  removeTodo: async (userId, itemId) => {
    try {
      const { endPoint, option } = requestData.removeTodo(userId, itemId);
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  removeAllTodos: async (userId) => {
    try {
      const { endPoint, option } = requestData.removeAllTodos(userId);
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  setTodoPriority: async (userId, itemId, priority) => {
    try {
      const { endPoint, option } = requestData.setTodoPriority(
        userId,
        itemId,
        priority,
      );
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  toggleTodoComplete: async (userId, itemId) => {
    try {
      const { endPoint, option } = requestData.toggleTodoComplete(
        userId,
        itemId,
      );
      const data = await request(endPoint, option);
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
};

export default api;
