const ENDPOINT = "https://js-todo-list-9ca3a.df.r.appspot.com";

const request = async (url, method, bodyData) => {
  try {
    const result = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(bodyData),
    });
    return result.json();
  } catch (e) {
    console.warn(e);
  }
};

export const userApi = {
  getUser: (userId) => {
    return request(`${ENDPOINT}/api/users/${userId ? userId : ""}`, "GET");
  },

  setUser: (name) => {
    return request(`${ENDPOINT}/api/users/`, "POST", { name: name });
  },

  deleteUser: (userId) => {
    return request(`${ENDPOINT}/api/users/${userId}`, "DELETE");
  },
};

export const todoApi = {
  getItem: (userId) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/`, "GET");
  },

  setItem: (userId, contents) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/`, "POST", {
      contents: contents,
    });
  },

  putItem: (userId, itemId, contents) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/${itemId}`, "PUT", {
      contents: contents,
    });
  },

  toggleItem: (userId, itemId) => {
    return request(
      `${ENDPOINT}/api/users/${userId}/items/${itemId}/toggle/`,
      "PUT"
    );
  },

  setPriorityItem: (userId, itemId, priority) => {
    return request(
      `${ENDPOINT}/api/users/${userId}/items/${itemId}/priority/`,
      "PUT",
      {
        priority: priority,
      }
    );
  },

  deleteItem: (userId, itemId) => {
    return request(`${ENDPOINT}/api/users/${userId}/items/${itemId}`, "DELETE");
  },
};
