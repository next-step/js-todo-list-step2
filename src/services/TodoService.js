import {todoAdapter} from "../adapter/todoAdapter";


export default Object.freeze({

  fetchUsers () {
    return todoAdapter.get('/users');
  },

  fetchUser (userId) {
    return todoAdapter.get(`/users/${userId}`);
  },

  fetchItems (userId) {
    return todoAdapter.get(`/users/${userId}/items`);
  },

  addUser (name) {
    return todoAdapter.post('/users', { name });
  },

  addItem (userId, contents) {
    return todoAdapter.post(`/users/${userId}/items`, { contents });
  },

  putItem (userId, { itemId, contents }) {
    return todoAdapter.put(`/users/${userId}/items/${itemId}`, { contents });
  },

  toggleItem (userId, itemId) {
    return todoAdapter.put(`/users/${userId}/items/toggle`);
  },

  priorityItem (userId, { itemId, priority }) {
    return todoAdapter.put(`/users/${userId}/items/priority`, { priority });
  },

  removeUser (userId) {
    return todoAdapter.delete(`/users/${userId}`);
  },

  removeItem (userId, itemId) {
    return todoAdapter.delete(`/users/${userId}/items/${itemId}`);
  },

  removeItemAll (userId) {
    return todoAdapter.delete(`/users/${userId}/items`);
  },

})