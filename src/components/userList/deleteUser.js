import { API } from '../../api/api.js';
import { loadUsers } from './loadUsers.js';

export const deleteUser = async () => {
  const confirm = window.confirm('현재 선택된 유저를 삭제하시겠습니까?');

  if (confirm) {
    const selectedUser = document.querySelector('.active');
    await API.deleteUser(selectedUser.id);
    loadUsers();
  }
};
