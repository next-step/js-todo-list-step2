import { BASE_URL, ERROR_MESSAGE } from '../utils/constant.js'

const requestApi = async (path, { method = 'GET', header, body }) => {
  const option = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (header) {
    option.headers = Object.assign(option.headers, header)
  }

  if (body) {
    option.body = body
  }
  const res = await fetch(`${BASE_URL}${path}`, option)

  if (!res.ok) {
    throw new Error({ status: res.status, statusText: res.statusText })
  }
  return await res.json()
}

export const getTodos = async (username) => {
  try {
    return await requestApi(`/api/u/${username}/item`, { method: 'GET' })
  } catch (err) {
    console.error(err)
    console.error(ERROR_MESSAGE.NO_GET_TODOLIST)
    return { todoList: [] }
  }
}

export const addTodo = async (username, content) => {
  try {
    return await requestApi(`/api/u/${username}/item`, {
      method: 'POST',
      body: JSON.stringify(content),
    })
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_ADD_TODO)
  }
}

export const toggleTodo = async (username, id) => {
  try {
    await requestApi(`/api/u/${username}/item/${id}/toggle`, { method: 'PUT' })
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_COMPLETE_TODO)
  }
}

export const deleteTodo = async (username, id) => {
  try {
    return await requestApi(`/api/u/${username}/item/${id}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_DELETE_TODO)
  }
}

export const deleteAllTodo = async (username) => {
  try {
    return await requestApi(`/api/u/${username}/items`, { method: 'DELETE' })
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_DELETE_TODOLIST)
  }
}

export const changeTodo = async (username, id, content) => {
  try {
    return await requestApi(`/api/u/${username}/item/${id}`, {
      method: 'PUT',
      body: JSON.stringify(content),
    })
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_CHANGE_TODO)
  }
}

export const changeTodoPriority = async (username, id, content) => {
  try {
    return await requestApi(`/api/u/${username}/item/${id}/priority`, {
      method: 'PUT',
      body: JSON.stringify(content),
    })
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_CHANGE_TODO_PRIORITY)
  }
}

export const getUsers = async () => {
  try {
    return await requestApi(`/api/u`, { method: 'GET' })
  } catch (err) {
    console.error(err)
    alert(ERROR_MESSAGE.NO_GET_TODOUSER_LIST)
  }
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
