import { request, HTTP_METHOD } from './request.js';

export const getUserList = async () => {
   const res = await request(HTTP_METHOD.GET, 'api/users');
   return await res.json();
}

export const addUser = async (userInfo) => {
  const res = await request(HTTP_METHOD.POST, 'api/users', userInfo);
  return  await res.json();
}

export const getUser = async (userId) => {
  const res = await request(HTTP_METHOD.GET,`api/users/${userId}`);
  return await res.json();
}
