import { POST } from '../lib/api/RestApi.js';
export const createUser = async (name) => {
  try {
    return await POST('/api/users', { name });
  } catch (error) {
    console.log(error);
  }
};
