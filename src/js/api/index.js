export const defaultErrorMessage = '잠시 후 다시 시도해주세요';

const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const headers = { 'Content-Type': 'application/json' };

const requestParams = {
  getUserList: () => {
    return {
      endPoint: 'api/users/',
      option: {
        method: HttpMethod.GET,
      },
    };
  },

  getUser: (userId) => {
    return {
      endPoint: `api/users/${userId}`,
      option: {
        method: HttpMethod.GET,
      },
    };
  },

  addUser: (name) => {
    return {
      endPoint: 'api/users/',
      option: {
        method: HttpMethod.POST,
        headers,
        body: JSON.stringify({ name }),
      },
    };
  },

  removeUser: (userId) => {
    return {
      endPoint: `api/users/${userId}`,
      option: {
        method: HttpMethod.DELETE,
      },
    };
  },

  addTodoItem: (userId, contents) => {
    return {
      endPoint: `api/users/${userId}/items/`,
      option: {
        method: HttpMethod.POST,
        headers,
        body: JSON.stringify({ contents }),
      },
    };
  },

  updateTodo: (userId, itemId, contents) => {
    return {
      endPoint: `api/users/${userId}/items/${itemId}`,
      option: {
        method: HttpMethod.PUT,
        headers,
        body: JSON.stringify({ contents }),
      },
    };
  },
  removeTodo: (userId, itemId) => {
    return {
      endPoint: `api/users/${userId}/items/${itemId}`,
      option: {
        method: HttpMethod.DELETE,
      },
    };
  },
  removeAllTodos: (userId) => {
    return {
      endPoint: `api/users/${userId}/items/`,
      option: {
        method: HttpMethod.DELETE,
      },
    };
  },
  toggleTodoComplete: (userId, itemId) => {
    return {
      endPoint: `api/users/${userId}/items/${itemId}/toggle`,
      option: {
        method: HttpMethod.PUT,
      },
    };
  },
  setTodoPriority: (userId, itemId, priority) => {
    return {
      endPoint: `api/users/${userId}/items/${itemId}/priority`,
      option: {
        method: HttpMethod.PUT,
        headers,
        body: JSON.stringify({ priority }),
      },
    };
  },
};

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
