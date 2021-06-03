import { API } from '../utils/api.js';
import { URL } from '../constants/constants.js';

export const getUsers = async () => {
  try {
    const result = await API.get(URL.GET_USERS);
    if (result.ok) {
      const jsonData = await result.json();
      return jsonData.map((user) => user.name);
    }

    throw new Error(`Error State: ${result.status}`);
  } catch (error) {
    console.error(`User List Get Error: ${error}`);
  }
};
