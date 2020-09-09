import HttpMethod from '../constants/HttpMethod.js';
import {todoAdapter} from "../adapter/todoAdapter.js";

export default Object.freeze({

  fetchUsers () {
    return todoAdapter.get('/users');
  },

  fetchUser (userId) {
    return todoAdapter.get(`/users/${userId}`)
  },

  addUser (name) {
    return todoAdapter.post('/users', { name });
  },

  removeUser (userId) {
    return todoAdapter.delete(`/users/${userId}`);
  },

  fetchItems (userId) {
    return todoAdapter.get(`/users/${userId}/items`);
  },

  addItem (userId, contents) {
    return todoAdapter.get(`/users/${userId}/items`, { contents });
  },

  putItem (userId, { _id: itemId, contents }) {
    return todoAdapter.put(`/users/${userId}/items/${itemId}`, { contents });
  },

  toggleItem (userId, itemId) {
    return todoAdapter.put(`/users/${userId}/items/${itemId}/toggle`);
  },

  putPriorityItem (userId, { _id: itemId, priority }) {
    return todoAdapter.put(`/users/${userId}/items/${itemId}/priority`, { priority });
  },

  removeItem (userId, itemId) {
    return todoAdapter.delete(`/users/${userId}/items/${itemId}`);
  },

  removeAllItem (userId) {
    return todoAdapter.delete(`/users/${userId}/items`);
  },
})