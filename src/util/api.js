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
    console.log(error);
  }
};

const api = {
  getUsersList: () => request(`${Router.USERS}`, CONSTANT.GET, ''),
  getUserInfo: (userId) => request(`${Router.USER(userId)}`, CONSTANT.GET),
  getUserTodos: (userId) => request(`${Router.ITEM(userId)}`, CONSTANT.GET),
};

export default api;
