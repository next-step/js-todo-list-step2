const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const headers = { 'Content-Type': 'application/json' };

const requestData = {
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
      endPoint: `/api/users/${userId}/items/`,
      option: {
        method: HttpMethod.POST,
        body: JSON.stringify({ contents }),
      },
    };
  },

  updateTodo: (userId, itemId, contents) => {
    return {
      endPoint: `/api/users/${userId}/items/${itemId}`,
      option: {
        method: HttpMethod.PUT,
        headers,
        body: JSON.stringify({ contents }),
      },
    };
  },
  removeTodo: (userId, itemId) => {
    return {
      endPoint: `/api/users/${userId}/items/${itemId}`,
      option: {
        method: HttpMethod.DELETE,
      },
    };
  },
  removeAllTodo: (userId) => {
    return {
      endPoint: `/api/users/${userId}/items/`,
      option: {
        method: HttpMethod.DELETE,
      },
    };
  },
  toggleTodoComplete: (userId, itemId) => {
    return {
      endPoint: `/api/users/${userId}/items/${itemId}/toggle`,
      option: {
        method: HttpMethod.PUT,
      },
    };
  },
  setTodoPriority: (userId, itemId, priority) => {
    return {
      endPoint: `/api/users/${userId}/items/${itemId}/priority`,
      option: {
        method: HttpMethod.PUT,
        headers,
        body: JSON.stringify({ priority }),
      },
    };
  },
};

export default requestData;
