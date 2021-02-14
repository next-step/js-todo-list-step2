import { API } from '../api.js';
import { loadTodos } from '../todoList/loadTodos.js';
import { setCurrentUser } from '../localStorage.js';

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

    }

    // 웹로딩시 아무 유저도 안 보일 때 어떤 걸 보여줄 것인지도 적어줘야 함
    // 어떤 유저를 눌렀다가 다시 눌렀을 때 선택해제되고 기본 유저를 보여줘야함

    const currenActiveUser = document.querySelector(`[data-id='${selectedUser}']`);
    currenActiveUser.classList.add('active');

    await loadTodos(selectedUser);

    setCurrentUser(currenActiveUser.dataset.id);
};