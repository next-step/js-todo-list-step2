import {
    BASE_URL,
    USER_PATH,
    $,
  } from './constants.js';
  
const UserList = function() {
    const appendUserBtn = function(user) {
        return `
        <button class="ripple" data-id="${user._id}">${user.name}</button>
        `;
    }

    const returnUserInfo = async function() {
        const response = await fetch(`${BASE_URL}${USER_PATH}`);
        const users = await response.json();
        return users;
    }
    const render = async function() {
        const userInfos = await returnUserInfo();
        userInfos.forEach(userInfo => $('#userlist').insertAdjacentHTML('afterbegin', appendUserBtn(userInfo)));
    }

    render();
}

export {UserList};