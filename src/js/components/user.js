import { $ } from '../../utils/utils.js';
import { DOM_ID } from '../../constants/constants.js';

import { getUsers, createUser, deleteUser } from '../../api/user.js';

function getUserTemplate(users) {
  let html = users.reduce(
    (acc, user, idx) =>
      (acc += `<button class="ripple ${idx === 0 && 'active'}" data-id=${user._id}>${
        user.name
      }</button>`),
    '',
  );

  html += `<button class="ripple user-create-button" data-action="createUser">+ 유저 생성</button>
  <button class="ripple user-delete-button" data-action="deleteUser">삭제 -</button>`;
  return html;
}

export default class User {
  constructor() {
    this.target = $(DOM_ID.USER_LIST);

    this._addEvent();
    this.render();
  }

  _addEvent() {
    this.target.addEventListener('click', this.userListClickHandler.bind(this));
  }

  userListClickHandler({ target }) {
    if (target.dataset['action'] === undefined) {
      this.changeUser(target);
      return;
    }

    if (target.dataset['action'] === 'createUser') {
      this.createUser();
      return;
    }

    if (target.dataset['action'] === 'deleteUser') {
      this.deleteUser();
      return;
    }
  }

  changeUser(target) {
    // Change User Active
    const $usersList = this.target.querySelectorAll('button.ripple');
    [...$usersList].map((element) => element.classList.remove('active'));
    target.classList.add('active');

    // Change User Title
    this.changeUserTitle();

    // getUser and render todo
    // const userName = target.textContent;
  }

  changeUserTitle() {
    const $userTitle = $('#user-title strong');
    const $activeUser = this.getActiveUser();

    $userTitle.innerHTML = $activeUser.textContent;
  }

  getActiveUser() {
    return this.target.querySelector('.active');
  }

  async createUser() {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');

    if (userName === null) return;
    if (userName.length < 2) {
      alert('유저 생성 오류 - 최소 2글자 이상이어야 합니다.');
      return;
    }

    const result = await createUser({ name: userName });
    this.render();
  }

  async deleteUser() {
    const clickResult = confirm('정말로 삭제하시겠습니까?');

    if (!clickResult) return;

    const target = this.getActiveUser();
    const userId = target.dataset['id'];

    await deleteUser(userId);
    this.render();
  }

  async render() {
    const users = await getUsers();
    const userListHTMl = getUserTemplate(users);

    this.target.innerHTML = userListHTMl;
    this.changeUserTitle();
  }
}
