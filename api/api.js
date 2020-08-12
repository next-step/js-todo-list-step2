import { API_URL } from '../utils/constants.js'

const METHOD = {
  PUT(data) {
    return {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  },
  POST(data) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  },
  DELETE() {
    return {
      method: 'DELETE',
    }
  },
}


const api = (() => {
  const request = (url, config) => {
    console.log('[REQUEST]')
    console.log(JSON.stringify({ url, ...config }, null, 2))
    return fetch(url, config)
  }
  const requestWithReturn = (url, config) => request(url, config).then((data) => data.json())
  return {
    getUsers() {
      return requestWithReturn(API_URL + '/api/u')
    },
    getTodos(username) {
      return requestWithReturn(API_URL + `/api/u/${username}/item`)
    },
    createTodo(username, data) {
      return request(API_URL + `/api/u/${username}/item`, METHOD.POST(data))
    },
    toggleTodo(username, id) {
      return request(API_URL + `/api/u/${username}/item/${id}/toggle`, METHOD.PUT())
    },
    updateTodoContent({ username, id, data }) {
      return request(API_URL + `/api/u/${username}/item/${id}`, METHOD.PUT(data))
    },
    updateTodoPriority({ username, id, data }) {
      return request(API_URL + `/api/u/${username}/item/${id}/priority`, METHOD.PUT(data))
    },
    deleteTodo(username, id) {
      return request(API_URL + `/api/u/${username}/item/${id}`, METHOD.DELETE())
    },
    deleteTodoAll(username) {
      return request(API_URL + `/api/u/${username}/items`, METHOD.DELETE())
    },
  }
})()

export default api
