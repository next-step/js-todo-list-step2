const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api";
const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const fetchApi = async ({ uri = "", method = METHOD.GET, body = {} }) => {
  try {
    const option = {
      method,
      headers: { "Content-Type": "application/json;charset=utf-8" },
    };
    if (method !== METHOD.GET) {
      option.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${uri}`, option);
    return response.json();
  } catch (err) {
    console.warn(err);
  }
};

export const User = {
  URI: "/users",
  async getUsers() {
    return fetchApi({ uri: this.URI });
  },
  async addUser(name) {
    return fetchApi({ uri: this.URI, method: METHOD.POST, body: { name } });
  },
  async getUser(userId) {
    return fetchApi({ uri: `${this.URI}/${userId}` });
  },
  async deleteUser(userId) {
    return fetchApi({ uri: `${this.URI}/${userId}`, method: METHOD.DELETE });
  },
};

export const Todo = {
  priority: { NONE: "NONE", FIRST: "FIRST", SECOND: "SECOND" },
  setUri: (userId, itemId = "") => `/users/${userId}/items/${itemId}`,
  async getTodos(userId) {
    return fetchApi({ uri: this.setUri(userId) });
  },
  async addTodo(userId, contents) {
    return fetchApi({
      uri: this.setUri(userId),
      method: METHOD.POST,
      body: { contents },
    });
  },
  async deleteAllTodos(userId) {
    return fetchApi({ uri: this.setUri(userId), method: METHOD.DELETE });
  },
  async deleteTodo(userId, itemId) {
    return fetchApi({
      uri: this.setUri(userId, itemId),
      method: METHOD.DELETE,
    });
  },
  async updateContents(userId, { _id: itemId, contents }) {
    return fetchApi({
      uri: this.setUri(userId, itemId),
      method: METHOD.PUT,
      body: { contents },
    });
  },
  async updatePriority(userId, { _id: itemId, priority }) {
    return fetchApi({
      uri: `${this.setUri(userId, itemId)}/priority`,
      method: METHOD.PUT,
      body: { priority },
    });
  },
  async toggleIsComplete(userId, itemId) {
    return fetchApi({
      uri: `${this.setUri(userId, itemId)}/toggle`,
      method: METHOD.PUT,
    });
  },
};
