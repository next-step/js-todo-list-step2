import { errorMessageMap } from "./constants.js";
import { loadingBarTemplate } from "./templates.js";

const API_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";

const displayLoadingBarDuringRequest = () => {
  const $target = document.querySelector(".todo-list");
  $target.innerHTML = loadingBarTemplate();
};

const request = async (uri, method) => {
  try {
    displayLoadingBarDuringRequest();
    const response = await fetch(uri, method);

    // @sunivers 코드 참고
    if (!response.ok) {
      throw new Error(errorMessageMap.FETCH_FAIL(response.status));
    }
    return await response.json();
  } catch (error) {
    throw new Error(errorMessageMap.FETCH_ERROR(error));
  }
};

const api = {
  getTodos: async (username) => {
    const data = await request(`${API_URL}/${username}/item`);
    return data.todoList;
  },
  postTodo: async (username, todoText) => {
    return request(`${API_URL}/${username}/item`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ contents: todoText }),
    });
  },
  removeTodo: async (username, id) => {
    return request(`${API_URL}/${username}/item/${id}`, {
      method: "DELETE",
    });
  },
  toggleTodo: async (username, id) => {
    return request(`${API_URL}/${username}/item/${id}/toggle`, {
      method: "PUT",
    });
  },
  modifyTodo: async (username, id, nextTodo) => {
    return request(`${API_URL}/${username}/item/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ contents: nextTodo }),
    });
  },
  getUsers: async () => request(API_URL),
};

export default api;
