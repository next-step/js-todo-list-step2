import { BASE_URL, USER_PATH, $ } from './constants';

const UserList = function () {
  const appendUserBtn = function (user) {
    return `
        <button class="ripple" data-id="${user._id}">${user.name}</button>
        `;
  };

  const returnUserInfo = async function () {
    const response = await fetch(`${BASE_URL}${USER_PATH}`);
    const users = await response.json();
    return users;
  };

  const render = async function () {
    const userInfos = await returnUserInfo();
    userInfos.forEach(userInfo =>
      $('#user-list').insertAdjacentHTML('afterbegin', appendUserBtn(userInfo))
    );
  };

  const createUser = async function (userName) {
    const user = { name: userName };
    const response = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  };

  const onUserCreateHandler = async function () {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    await createUser(userName);
    render();
  };

  const init = function () {
    const userCreateButton = document.querySelector('.user-create-button');

    userCreateButton.addEventListener('click', onUserCreateHandler);
    render();
  };

  init();
};

export default { UserList };
