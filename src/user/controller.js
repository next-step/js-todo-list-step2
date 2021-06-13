import { GET, POST } from '../lib/api/RestApi.js';
export const createUser = async (name) => {
  try {
    return await POST('/api/users', { name });
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
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
