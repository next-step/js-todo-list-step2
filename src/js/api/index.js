const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const Method = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT'
}

const Headers = { 'Content-Type': 'application/json' };

const URI = {
  handleUsers: `/api/users`,
  handleUser: (userId) => `/api/users/${userId}`,
  handleTodos: (userId) => `/api/users/${userId}/items/`,
  handleTodo: (userId, itemId) => `/api/users/${userId}/items/${itemId}`,
  handleEventTodos: (userId, itemId, event) => `/api/users/${userId}/items/${itemId}/${event}` // priority, toggle
}

const option = (method = Method.GET, data = {}) => {
  if (method === 'GET') {
    return {
      method: Method[method],
      headers: Headers,
    }
  } else {
    return {
      method: Method[method],
      headers: Headers,
      body: JSON.stringify(data)
    }
  }
}

function fetchAPI(uri, options) {
  return fetch(baseUrl + uri, options)
    .then(Response => {
      if (!Response.ok) throw new Error(Response.status);
      return Response.json();
    })
    .catch(error => console.error(error));
}

const API = {
  getUserList: fetchAPI(URI.handleUsers, option(Method.GET)),
  addUser: (userName) => (userName) && fetchAPI(URI.handleUsers, option(Method.POST, { name: userName })),
  deleteUser: (userId) => (userId) && fetchAPI(URI.handleUser(userId), option(Method.DELETE)),
  getUserTodoList: (userId) => (userId) && fetchAPI(URI.handleTodos(userId), option(Method.GET)),
  addTodo: (userId, contents) => (userId, contents) && fetchAPI(URI.handleTodos(userId), option(Method.POST, { contents: contents })),
  deleteTodo: (userId, itemId) => (userId && itemId) && fetchAPI(URI.handleTodo(userId, itemId), option(Method.DELETE)),
}

export default API;
