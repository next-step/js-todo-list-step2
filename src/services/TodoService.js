import HttpMethod from '../constants/HttpMethod.js';

const API_PATH = 'https://blackcoffee-todolist.df.r.appspot.com/api/u';
const headers = { 'Content-Type': 'application/json' };

export default Object.freeze({

  fetchUsers () {
    return fetch(API_PATH).then(response => response.json());
  },

  fetchItems (user) {
    const path = `${API_PATH}/${user}/item`;
    return fetch(path).then(response => response.json());
  },

  addItem (user, contents) {
    const path = `${API_PATH}/${user}/item`;
    const body = JSON.stringify({ contents });
    const option = { method: HttpMethod.POST, headers, body };
    return fetch(path, option).then(response => response.json());
  },

  putItem (user, { _id, contents }) {
    const path = `${API_PATH}/${user}/item/${_id}`;
    const body = JSON.stringify({ contents });
    const option = { method: HttpMethod.PUT, headers, body };
    return fetch(path, option).then(response => response.json());
  },

  toggleItem (user, id) {
    const path = `${API_PATH}/${user}/item/${id}/toggle`;
    const option = { method: HttpMethod.PUT, headers };
    return fetch(path, option).then(response => response.json());
  },

  removeItem (user, id) {
    const path = `${API_PATH}/${user}/item/${id}`;
    const option = { method: HttpMethod.DELETE };
    return fetch(path, option).then(response => response.json());
  },

  removeAllItem (user) {
    const path = `${API_PATH}/${user}/items`;
    const option = { method: HttpMethod.DELETE };
    return fetch(path, option).then(response => response.json());
  },

  putPriorityItem (user, { _id, priority }) {
    const path = `${API_PATH}/${user}/item/${_id}/priority`;
    const body = JSON.stringify({ priority });
    const option = { method: HttpMethod.PUT, headers, body };
    return fetch(path, option).then(response => response.json());
  },
})