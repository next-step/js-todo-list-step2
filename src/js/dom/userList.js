import $USER_DOM from '../util/constants.js';
import user from '../user.js';
import $api from '../api.js';
import {clickButton, buttonClicked} from './eventListner.js';

const $user_createButton = document.querySelector('.user-create-button');

const userList = (() => {
    const init = async () => {
        const users = await $api.user.getAll();
        users.map(element => drawButtons(element));
        setSelected(users[0]);
    }

    const drawButtons = (element) => {
        const userButton = document.createElement('button');
        userButton.setAttribute('id', element._id);
        userButton.setAttribute('class', 'ripple');
        userButton.innerHTML = `${element.name}`;
        clickButton(userButton);
        $user_createButton.insertAdjacentElement('beforebegin', userButton);
        userButton.insertAdjacentHTML('beforebegin', ' ');
    }

    const setSelected = (selected) => {
        selected.id = selected._id;
        buttonClicked(selected);
    }

    const add = () => {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
        const newUser = {
            name : userName
        }
        $api.user.addUsers(newUser);
        init();
    }

    return {
        init,
        add
    };

})();

export default userList