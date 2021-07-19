import { $http } from './index.js';

export const todoListAPI = {
  fetchTodoItems(userId) {
    return $http.get(`api/users/${userId}/items`);
  },

  createItem(userId, contents) {
    return $http.post(`api/users/${userId}/items`, contents);
  },

  deleteAllItems(userId) {
    return $http.delete(`api/users/${userId}/items`);
  },

  deleteItem(userId, itemId) {
    return $http.delete(`api/users/${userId}/items/${itemId}`);
  },

  editItemContent(userId, itemId, contents) {
    return $http.put(`api/users/${userId}/items/${itemId}`, contents);
  },

  editItemPriority(userId, itemId, priority) {
    return $http.put(`api/users/${userId}/items/${itemId}/priority`, priority);
  },

  toggleItemComplete(userId, itemId) {
    return $http.put(`api/users/${userId}/items/${itemId}/toggle`);
  },
};
