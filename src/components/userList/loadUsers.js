import {API} from '../../api/api.js';
import { loadTodos } from '../todoList/loadTodos.js';
import {setCurrentUser} from '../../utils/localStorage.js';
import {userButtonTemplate, userControlTemplate} from './userTemplates.js';

export const loadUsers = async (selectedUser = '') => {
  const users = await API.getUsers();
  const $userList = document.getElementById('user-list');

  $userList.innerHTML = '';
  users.map((user) => $userList.insertAdjacentHTML('beforeend', userButtonTemplate(user)));
  $userList.insertAdjacentHTML('beforeend', userControlTemplate());
  
  if(!selectedUser) {
    const firstUser = $userList.firstChild;
    firstUser.classList.add('active');

    await loadTodos(firstUser.id);
    setCurrentUser(firstUser.id);
  }else{
    const $ActiveUser = document.getElementById(`${selectedUser}`);
    $ActiveUser.classList.add('active');

    await loadTodos(selectedUser);
    setCurrentUser($ActiveUser.id);
  }
}
