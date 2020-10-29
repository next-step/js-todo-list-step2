// User 추가하기
// POST
// /api/user

export default class User {
  constructor() {
    this.baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";
    this.headers = { "Content-Type": "application/json" };
  }

  addUser(name) {
    fetch(`${this.baseUrl}/api/users`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name }),
    }).then(console.log);
  }

  fetchUsers() {
    return fetch(`${this.baseUrl}/api/users`).then((response) =>
      response.json()
    );
  }
}
