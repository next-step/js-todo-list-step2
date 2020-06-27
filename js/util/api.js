import { BASE_URL } from './constants.js';

const request = async (url, option) => {
  try {
    const result = await fetch(url, option);
    return result.json();
  } catch (e) {
    console.error(e);
  }
};

const options = {
  POST: (text) => {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: text,
      }),
    };
  },
  DELETE: () => {
    return {
      method: 'DELETE',
    };
  },
  TOGGLE: () => {
    return {
      method: 'PUT',
    };
  },
  PRIORITY: (priority) => {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priority,
      }),
    };
  },
  PUT: (text) => {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: text,
      }),
    };
  },
};

const api = {
  fetchUsers: () => {
    return request(`${BASE_URL}/api/u`);
  },
  fetchUserTodo: (username) => {
    return request(`${BASE_URL}/api/u/${username}/item`);
  },
  fetchTodoPost: (username, text) => {
    return request(`${BASE_URL}/api/u/${username}/item`, options.POST(text));
  },
  fetchTodoUpdate: (username, id, text) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${id}`,
      options.PUT(text),
    );
  },
  fetchTodoRemove: (username, id) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${id}`,
      options.DELETE(),
    );
  },
  fetchTodoRemoveAll: (username) => {
    return request(`${BASE_URL}/api/u/${username}/items`, options.DELETE());
  },
  fetchTodoToggle: (username, id) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${id}/toggle`,
      options.TOGGLE(),
    );
  },
  fetchTodoPriority: (username, id, priority) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${id}/priority`,
      options.PRIORITY(priority),
    );
  },
};

export default api;
