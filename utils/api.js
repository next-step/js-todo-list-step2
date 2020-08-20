import { BASE_URL } from "./data.js";

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return response.json();
  } catch (err) {
    console.log(err);
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
  PUT: () => {
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
      `${BASE_URL}/api/u/${username}/item/${_id}`,
      options.TOGGLE()
    );
  },
  editTodoFromAPI: (username, _id) => {
    return request(`${BASE_URL}/api/u/${username}/item/${_id}`, options.EDIT());
  },
};
export default api;
