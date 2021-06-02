import CONSTANT from '../constants.js';
import Router from '../Router.js';

const getFetchOption = (method, body) => {
  if (method === CONSTANT.POST) {
    return {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
  }

  return { method };
};
const request = async (url, method, body) => {
  const option = getFetchOption(method, body);
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
      const userList = await request(`${Router.USERS}`, CONSTANT.GET, '');
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
      const userInfo = await request(`${Router.USER(userId)}`, CONSTANT.GET);
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
      const userTodos = await request(`${Router.ITEM(userId)}`, CONSTANT.GET);
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
};

export default api;
