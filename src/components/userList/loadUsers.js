import {API} from '../../api/api.js';
import { loadTodos } from '../todoList/loadTodos.js';
import {setCurrentUser} from '../../utils/localStorage.js';

const userButtonTemplate = ({name, _id}) => {
  return `<button class="ripple" id=${_id}>${name}</button>`;
}

const userControlTemplate = () => {
    return `<button class="ripple user-create-button">+ 유저 생성</button>
            <button class="ripple user-delete-button">- 유저 삭제</button>`;
}

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
