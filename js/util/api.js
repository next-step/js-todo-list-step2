import { BASE_URL } from './constants.js';

const request = async (url) => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (e) {
    console.error(e);
  }
};

const option = {
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
  PUT: () => {
    return {
      method: 'PUT',
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
    return request(`${BASE_URL}/api/u/${username}/item`, option.POST(text));
  },
  fetchTodoUpdate: (username, id) => {
    return request(`${BASE_URL}/api/u/${username}/item/${id}`, option.PUT());
  },
  fetchTodoRemove: (username, id) => {
    return request(`${BASE_URL}/api/u/${username}/item/${id}`, option.DELETE());
  },
  fetchTodoToggle: (username, id) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${id}/toggle`,
      option.PUT,
    );
  },
};

export default api;
