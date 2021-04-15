const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const urls = {
  USER: '/api/users/',
  USER_TODO: (userId) => `/api/users/${userId}/items/`,
  UPDATE_TODO: (userId, itemId) => `/api/users/${userId}/items/${itemId}`,
  TOGGLE_TODO: (userId, itemId) =>
    `/api/users/${userId}/items/${itemId}/toggle`,
  SET_PRIORITY: (userId, itemId) =>
    `/api/users/${userId}/items/${itemId}/priority`,
};

const errorResponse = (message) => {
  return {
    isError: true,
    errorMessage: message || '잠시 후 다시 시도해주세요',
  };
};

const successResponse = (data) => {
  return {
    isError: false,
    data,
  };
};

const request = async (url, body) => {
  try {
    const response = await fetch(baseUrl + url, body);
    const data = await response.json();
    if (response.status === 500) {
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
      const data = await request(urls.USER, { method: METHODS.GET });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  getUser: async (userId) => {
    try {
      const data = await request(urls.USER + userId, { method: METHODS.GET });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  addUser: async (name) => {
    try {
      const data = await request(urls.USER, { method: METHODS.POST, name });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  removeUser: async (userId) => {
    try {
      await request(urls.USER + userId, { method: METHODS.DELETE });
      return successResponse();
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  addTodoItem: async (userId, item) => {
    try {
      const data = await request(USER_TODO(userId), {
        method: METHODS.POST,
        contents: item,
      });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },

  updateTodo: async (userId, itemId) => {
    try {
      const data = await request(url.UPDATE_TODO(userId, itemId), {
        method: METHODS.PUT,
      });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  removeTodo: async (userId, itemId) => {
    try {
      const data = await request(urls.UPDATE_TODO(userId, itemId), {
        method: METHODS.DELETE,
      });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  removeAllTodos: async (userId) => {
    try {
      const data = await request(urls.USER_TODO(userId), {
        method: METHODS.DELETE,
      });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  setTodoPriority: async (userId, itemId, priority) => {
    try {
      const data = await request(urls.SET_PRIORITY(userId, itemId), {
        method: METHODS.PUT,
        priority,
      });
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
  toggleTodoComplete: async (userId, itemId) => {
    try {
      const data = await request(user.TOGGLE_TODO(userId, itemId));
      return successResponse(data);
    } catch ({ message }) {
      return errorResponse(message);
    }
  },
};

export default api;
