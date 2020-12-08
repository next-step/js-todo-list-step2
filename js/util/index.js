import { request, HTTP_METHOD } from './request.js';

export const getUserList = async () => {
   const res = await request(HTTP_METHOD.GET, 'api/users');
   return res.json();
}

export const addUser = async (userInfo) => {
  const res = await request(HTTP_METHOD.POST, 'api/users', userInfo);
  return  await res.json();
}

export const getUser = async (userId) => {
  const res = await request(HTTP_METHOD.GET,`api/users/${userId}`);
  return await res.json();
}

export const deleteUser = async (userId) => {
  const res = await request(HTTP_METHOD.DELETE, `api/users/${userId}`);
  return await res.json();
}

export const getUserTodo = async (userId) => {
  const res = await request(HTTP_METHOD.GET, `api/users/${userId}/items/`);
  return await res.json();
}

export const addUserTodo = async (userId, todo) => {
  const res = await request(HTTP_METHOD.POST,`api/users/${userId}/items/`, todo);
  return await res.json();
}
export const deleteUserAllTodo = async (userId ) => {
  const res = await request(HTTP_METHOD.DELETE,`api/users/${userId}/items/`);
  return await res.json();
}

export const deleteUserTodo = async (userId, itemId) => {
  const res = await request(HTTP_METHOD.DELETE,`api/users/${userId}/items/${itemId}`);
  return await res.json();
}
export const updateUserTodoContents = async (userId, itemId, todo) => {
  const res = await request(HTTP_METHOD.PUT,`api/users/${userId}/items/${itemId}`, todo);
  return await res.json();
}

export const updateUserTodoPriority = async (userId, itemId, priority) => {
  const res = await request(HTTP_METHOD.PUT,`api/users/${userId}/items/${itemId}/priority`, priority);
  return await res.json();
}

export const toggleTodoComplete = async (userId, itemId) => {
  const res = await request(HTTP_METHOD.PUT,`api/users/${userId}/items/${itemId}/toggle`);
  return await res.json();
}



