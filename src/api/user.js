import { API } from '../utils/api.js';
import { BASE_URL } from '../constants/constants.js';

export const getUsers = async () => {
  try {
    const response = await API.get(BASE_URL);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`User List Get Error: ${error}`);
  }
};

export const createUser = async (body) => {
  try {
    const response = await API.post(BASE_URL, body);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create User Error: ${error}`);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`${BASE_URL}/${userId}`);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Delete User Error:${error}`);
  }
};
