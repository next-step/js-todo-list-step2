import { GET, POST, DELETE } from '../lib/api/RestApi.js';
export const createUser = async (name) => {
  try {
    return await POST('/api/users', { name });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    return await GET('/api/users');
  } catch (error) {
    console.error(error);
  }
};

export const getOneUser = async (userId) => {
  try {
    return await GET(`/api/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserAPI = async (userId) => {
  try {
    return await DELETE(`/api/users/${userId}`);
  } catch (error) {
    console.error(error);
  }
};
