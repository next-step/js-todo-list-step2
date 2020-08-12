import {
  ERROR_MESSAGE_MAP,
  API_METHOD,
  API_HEADERS,
  API_BODY,
} from "./constants.js";
import { loadingBarTemplate } from "./templates.js";

const API_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";

const displayLoadingBarDuringRequest = () => {
  const $target = document.querySelector(".todo-list");
  $target.innerHTML = loadingBarTemplate();
};

const createMethod = (method, headers, body) => {
  return {
    method,
    headers,
    body,
  };
};

const method = {
  postTodo: (contents) =>
    createMethod(
      API_METHOD.POST,
      API_HEADERS.JSON,
      API_BODY.TODO_JSON(contents)
    ),
  removeTodo: createMethod(API_METHOD.DELETE),
  toggldTodo: createMethod(API_METHOD.PUT),
  modifyTodo: (nextTodo) =>
    createMethod(
      API_METHOD.PUT,
      API_HEADERS.JSON,
      API_BODY.TODO_JSON(nextTodo)
    ),
  changePriority: (priority) =>
    createMethod(
      API_METHOD.PUT,
      API_HEADERS.JSON,
      API_BODY.PRIORITY_JSON(priority)
    ),
};

const request = async (uri, method) => {
  try {
    displayLoadingBarDuringRequest();
    const response = await fetch(uri, method);

    // @sunivers 코드 참고
    if (!response.ok) {
      throw new Error(ERROR_MESSAGE_MAP.FETCH_FAIL(response.status));
    }
    return await response.json();
  } catch (error) {
    throw new Error(ERROR_MESSAGE_MAP.FETCH_ERROR(error));
  }
};

const api = {
  getTodos: async (username) => {
    const data = await request(`${API_URL}/${username}/item`);
    return data.todoList;
  },
  postTodo: async (username, contents) => {
    return request(`${API_URL}/${username}/item`, method.postTodo(contents));
  },
  removeTodo: async (username, id) => {
    return request(`${API_URL}/${username}/item/${id}`, method.removeTodo);
  },
  toggleTodo: async (username, id) => {
    return request(
      `${API_URL}/${username}/item/${id}/toggle`,
      method.toggldTodo
    );
  },
  modifyTodo: async (username, id, nextTodo) => {
    return request(
      `${API_URL}/${username}/item/${id}`,
      method.modifyTodo(nextTodo)
    );
  },
  getUsers: async () => request(API_URL),
  changePriority: async (username, id, priority) => {
    return request(
      `${API_URL}/${username}/item/${id}/priority`,
      method.changePriority(priority)
    );
  },
};

export default api;
