import { API } from '../api.js';
import { loadTodos } from '../todoList/loadTodos.js';

const userBtnTemplate = ({ _id, name }) => {
    return `<button data-id=${_id} class="ripple">${name}</button>`;
};

const addDeleteBtnTemplate = () => {
    return `<button class="ripple user-create-button">유저 생성 ➕</button>
    <button class="ripple user-delete-button">유저 삭제 ✖️</button>`;
};

export const loadUsers = async (selectedUser = '') => {
    const userList = await API.getUsers();
    const $userList = document.querySelector('#user-list');
    const userBtns = userList.map((user) => userBtnTemplate(user));
    $userList.innerHTML = userBtns.join('\n') + addDeleteBtnTemplate();

    if(!selectedUser){
        return;

    } else{
        const currenActiveUser = document.querySelector(`[data-id='${selectedUser}']`);
        currenActiveUser.classList.add('active');

        await loadTodos(selectedUser);
    }
};