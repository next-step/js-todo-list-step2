import { BASE_URL } from "./data.js";

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return response.json();
  } catch (err) {
    throw new Error(err);
  }
};

const options = {
  POST: (text) => {
    return {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        contents: text,
      }),
    };
  },
  DELETE: () => {
    return {
      method: "DELETE",
    };
  },
  TOGGLE: () => {
    return {
      method: "PUT",
    };
  },
  EDIT: (text) => {
    return {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        contents: text,
      }),
    };
  },
  PRIORITY: (priority) => {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priority,
      }),
    };
  },
};
const api = {
  getUserListFromAPI: () => {
    return request(`${BASE_URL}/api/u/`);
  },
  getTodoListFromAPI: (username) => {
    return request(`${BASE_URL}/api/u/${username}/item`);
  },
  addTodoListFromAPI: (username, text) => {
    return request(`${BASE_URL}/api/u/${username}/item`, options.POST(text));
  },
  deleteTodoFromAPI: (username, _id) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}`,
      options.DELETE()
    );
  },
  toggleTodoFromAPI: (username, _id) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}/toggle`,
      options.TOGGLE()
    );
  },
  editTodoFromAPI: (username, _id, contents) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}`,
      options.EDIT(contents)
    );
  },
  setPriorityFromAPI: (username, _id, priority) => {
    return request(
      `${BASE_URL}/api/u/${username}/item/${_id}/priority`,
      options.PRIORITY(priority)
    );
  },
};
export default api;
