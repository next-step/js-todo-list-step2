import config from '../config/index.js';
import http from '../utils/apiRequest.js';

export const getUsers = async () => {
  try {
    const users = await http.get(`${config.baseUrl}/u`);
    return users;
  } catch (e) {
    console.error(`Error: getUsers / ${e.message}`);
    throw Error(e.message);
  }
};
