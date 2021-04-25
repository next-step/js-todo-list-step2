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
  return fetch(baseUrl + uri, options).then(response => response.json())
}

const API = {
  getUserList: fetchAPI(URI.handleUsers, option('GET'))
}

export default API;
