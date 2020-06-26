import { BASE_URL } from '../utils/constant.js'

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
    return await requestApi(`/${username}/item`, { method: 'GET' })
  } catch (err) {
    console.error(err)
    console.error('Todo list를 가져오는데 실패했습니다.')
    return { todoList: [] }
  }
}

export const addTodo = async (username, content) => {
  try {
    return await requestApi(`/${username}/item`, {
      method: 'POST',
      body: JSON.stringify(content),
    })
  } catch (err) {
    console.error(err)
    alert('Todo를 추가하는데 실패했습니다.')
  }
}

export const toggleTodo = async (username, id) => {
  try {
    await requestApi(`/${username}/item/${id}/toggle`, { method: 'PUT' })
  } catch (err) {
    console.error(err)
    alert('Todo 완료처리하는데 실패했습니다.')
  }
}

export const deleteTodo = async (username, id) => {
  try {
    return await requestApi(`/${username}/item/${id}`, { method: 'DELETE' })
  } catch (err) {
    console.error(err)
    alert('Todo를 삭제하는데 실패했습니다.')
  }
}

export const deleteAllTodo = async (username) => {
  try {
    return await requestApi(`/${username}/items`, { method: 'DELETE' })
  } catch (err) {
    console.error(err)
    alert('Todo를 모두 삭제하는데 실패했습니다.')
  }
}

export const changeTodo = async (username, id, content) => {
  try {
    return await requestApi(`/${username}/item/${id}`, {
      method: 'PUT',
      body: JSON.stringify(content),
    })
  } catch (err) {
    console.error(err)
    alert('Todo를 수정하는데 실패했습니다.')
  }
}

export const getUsers = async () => {
  try {
    return await requestApi(``, { method: 'GET' })
  } catch (err) {
    console.error(err)
    alert('Todo User list를 가져오는데 실패했습니다')
  }
}
