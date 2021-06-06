import { POST } from '../lib/api/RestApi.js';
import baseUrl from '../config/env.js';
export const createUser = async (name) => {
  try {
    return await POST(baseUrl, { name });
  } catch (error) {
    console.error(error);
  }
};
