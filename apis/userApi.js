const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com'

export default {
  getUsers: function () {
    return fetch(`${BASE_URL}/api/users`).then((response) => response.json())
  },
}
