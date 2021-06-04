import CONSTANT from '../constants.js';
import Router from '../Router.js';

const headers = { 'Content-Type': 'application/json' };
const options = {
  GET: { method: CONSTANT.GET },
  POST: (body) => {
    return {
      method: CONSTANT.POST,
      headers,
      body: JSON.stringify(body) ?? '',
    };
  },
  PUT: (body) => {
    return {
      method: CONSTANT.PUT,
      headers,
      body: JSON.stringify(body) ?? '',
    };
  },
  DELETE: { method: CONSTANT.DELETE },
};

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (error) {
    throw {
      message: error.message,
    };
  }
};

const api = {
  getUsersList: async () => {
    try {
      const userList = await request(`${Router.USERS}`, options.GET);
      return {
        isError: false,
        data: userList,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
  getUserInfo: async (userId) => {
    try {
      const userInfo = await request(Router.USER(userId), options.GET);
      return {
        isError: false,
        data: userInfo,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
  getUserTodos: async (userId) => {
    try {
      const userTodos = await request(Router.ITEM(userId), options.GET);
      return {
        isError: false,
        data: userTodos,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
  addUser: async (name) => {
    try {
      const userInfo = await request(Router.USERS, options.POST({ name }));
      return {
        isError: false,
        data: userInfo,
      };
    } catch (error) {
      return {
        isError: false,
        data: error,
      };
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await request(Router.USER(userId), options.DELETE);
      return {
        isError: false,
        data: response,
      };
    } catch (error) {
      return {
        isError: false,
        data: error,
      };
    }
  },
  addTodoItem: async (userId, contents) => {
    try {
      const userInfo = await request(
        Router.ITEM(userId),
        options.POST({ contents })
      );
      return {
        isError: false,
        data: userInfo,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
  deleteTodoItem: async (userId, itemId) => {
    try {
      const response = await request(
        Router.USER_ITEM(userId, itemId),
        options.DELETE
      );
      return {
        isError: false,
        data: response,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
  toggleTodoItem: async (userId, itemId) => {
    try {
      const response = await request(
        Router.ITEM_TOGGLE(userId, itemId),
        options.PUT()
      );
      return {
        isError: false,
        data: response,
      };
    } catch (error) {
      return {
        isError: true,
        data: error,
      };
    }
  },
};

export default api;
