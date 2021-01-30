import { API } from '../../api/api.js';
import { loadUsers } from '../userList/loadUsers.js';

export const addTodo = async ({ target, key }, currentUser) => {
  if (key === 'Enter' && target.value) {
    await API.addTodo(target.value, currentUser);
    await loadUsers(currentUser);
    target.value = '';
  }
};
