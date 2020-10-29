// User 추가하기
// POST
// /api/user

export default class User {
  constructor() {
    this.baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";
    this.headers = { "Content-Type": "application/json" };
  }

  userAdd(name) {
    fetch(`${this.baseUrl}/api/user`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name }),
    }).then();
  }
}
