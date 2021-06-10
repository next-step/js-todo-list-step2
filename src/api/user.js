import { API } from '@utils/api.js';
import { BASE_URL } from '@constants/constants.js';

const URL = {
  getUsers: () => BASE_URL,
  createUsers: () => BASE_URL,
  deleteUsers: (userId) => `${BASE_URL}/${userId}`,
};

const getUsers = async () => {
  try {
    const response = await API.get(URL.getUsers());
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`User List Get Error: ${error}`);
  }
};

const createUser = async (body) => {
  try {
    const response = await API.post(URL.createUsers(), body);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Create User Error: ${error}`);
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await API.delete(URL.deleteUsers(userId));
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status}, ${response.statusText}`);
  } catch (error) {
    console.error(`Delete User Error:${error}`);
  }
};

export const userService = {
  getUsers,
  createUser,
  deleteUser,
};
