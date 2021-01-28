const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api";
const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const fetchApi = async ({ uri = "", method = METHOD.GET, body = {} }) => {
  try {
    const option = { method };
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
    const users = await fetchApi({ uri: this.URI });
    if (users.length) {
      return users;
    }

    await this.addUser("default");
    return this.getUsers();
  },
  async addUser(name) {
    return fetchApi({ uri: this.URI, body: { name } });
  },
  async getUser(userId) {
    return fetchApi({ uri: `${this.URI}/${userId}` });
  },
  async deleteUser(userId) {
    return fetchApi({ uri: `${this.URI}/${userId}` });
  },
};
