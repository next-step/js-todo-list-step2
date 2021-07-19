import { $http } from './index.js';

export const userAPI = {
  fetchUserList() {
    return $http.get('api/users');
  },

  createUser(body) {
    return $http.post('api/users', body);
  },

  fetchUser(id) {
    return $http.get(`api/users/${id}`);
  },

  deleteUser(id) {
    $http.delete(`api/users/${id}`);
  },
};
