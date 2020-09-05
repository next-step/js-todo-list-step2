import HttpMethod from '../constants/HttpMethod.js';

const API_PATH = 'https://blackcoffee-todolist.df.r.appspot.com/api/u';
const headers = { 'Content-Type': 'application/json' };

export default Object.freeze({

  async fetchUsers () {
    return await fetch(API_PATH).then(response => response.json());
  },

  async fetchItems (user) {
    const path = `${API_PATH}/${user}/item`;
    return await fetch(path).then(response => response.json());
  },

  async addItem (user, contents) {
    const path = `${API_PATH}/${user}/item`;
    const body = JSON.stringify({ contents });
    const option = { method: HttpMethod.POST, headers, body };
    return await fetch(path, option).then(response => response.json());
  },

  async putItem (user, { id, contents }) {
    const path = `${API_PATH}/${user}/item/${id}/toggle`;
    const body = JSON.stringify({ contents });
    const option = { method: HttpMethod.PUT, headers, body };
    return await fetch(path, option).then(response => response.json());
  },

  async toggleItem (user, id) {
    const path = `${API_PATH}/${user}/item/${id}/toggle`;
    const option = { method: HttpMethod.PUT, headers };
    return await fetch(path, option).then(response => response.json());
  },

  async removeItem (user, id) {
    const path = `${API_PATH}/${user}/item/${id}`;
    const option = { method: HttpMethod.DELETE };
    return await fetch(path, option).then(response => response.json());
  },

  async removeAllItem (user) {
    const path = `${API_PATH}/${user}/items`;
    const option = { method: HttpMethod.DELETE };
    return await fetch(path, option).then(response => response.json());
  },
})