export default class UserService {
  constructor() {
    this.baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";
    this.headers = { "Content-Type": "application/json" };
  }

  async addUser(name) {
    return await fetch(`${this.baseUrl}/api/users`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name }),
    });
  }

  async fetchUsers() {
    const response = await fetch(`${this.baseUrl}/api/users`);
    return await response.json();
  }

  async fetchUserTodo(userId) {
    return await fetch(
      `${this.baseUrl}/api/users/${userId}/items/`
    ).then((response) => response.json());
  }

  //유저를 삭제하는 경우는??
  async deleteUser(userId) {
    return await fetch(`${this.baseUrl}/api/users/${userId}/items/`, {
      method: "DELETE",
    });
  }

  async addUserTodo(userId, contents) {
    return await fetch(`${this.baseUrl}/api/users/${userId}/items/`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ contents }),
    }).then((response) => response.json());
  }

  async deleteUserTodosAll(userId) {
    return await fetch(`${this.baseUrl}/api/users/${userId}/items/`, {
      method: "DELETE",
    });
  }
  async deleteUserTodoOne(userId, itemId) {
    return await fetch(`${this.baseUrl}/api/users/${userId}/items/${itemId}`, {
      method: "DELETE",
    });
  }

  async updateUserTodo(userId, itemId, contents) {
    return await fetch(`${this.baseUrl}/api/users/${userId}/items/${itemId}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify({ contents }),
    });
  }

  async makePriorityUserTodo(userId, itemId, priority) {
    return await fetch(
      `${this.baseUrl}/api/users/${userId}/items/${itemId}/priority`,
      {
        method: "PUT",
        headers: this.headers,
        body: JSON.stringify({ priority }),
      }
    );
  }
  async toggleUserTodo(userId, itemId) {
    return await fetch(
      `${this.baseUrl}/api/users/${userId}/items/${itemId}/toggle`,
      {
        method: "PUT",
      }
    );
  }
}
