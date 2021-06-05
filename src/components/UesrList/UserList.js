import { $ } from '../../utils/utils.js';
import { DOM_ID } from '../../constants/constants.js';
import { getUsers, createUser, deleteUser } from '../../api/user.js';

export default class UserList {
  constructor({ userState }) {
    this.$usersList = $(DOM_ID.USER_LIST);
    this.userState = userState;

    this.init();
    this._addEvent();
  }

  _addEvent() {
    this.$usersList.addEventListener('click', this.userListClickHandler.bind(this));
  }

  userListClickHandler({ target }) {
    const userEvent = {
      undefined: this.changeUser.bind(this),
      createUser: this.createUser.bind(this),
      deleteUser: this.deleteUser.bind(this),
    };

    userEvent[target.dataset['action']](target);
  }

  changeUser(target) {
    console.log('change user');
    // Change User Active
    const $usersList = this.$usersList.querySelectorAll('button.ripple');
    [...$usersList].map((element) => element.classList.remove('active'));
    target.classList.add('active');

    // Change User Title
    this.changeUserTitle();
  }

  changeUserTitle() {
    const $userTitle = $('#user-title strong');
    const $activeUser = this.getActiveUser();

    // 초기 렌더링
    if (!$activeUser) return;

    const userId = $activeUser.dataset['id'];
    const activeUserName = $activeUser.textContent;

    this.userState.set({ userId, name: activeUserName });
    $userTitle.innerHTML = activeUserName;
  }

  getActiveUser() {
    return this.$usersList.querySelector('.active');
  }

  async createUser() {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');

    if (userName === null) return;
    if (userName.length < 2) {
      alert('유저 생성 오류 - 최소 2글자 이상이어야 합니다.');
      return;
    }

    const result = await createUser({ name: userName });
    this.userState.set({ userId: result._id, name: result.name });
  }

  async deleteUser() {
    const clickResult = confirm('정말로 삭제하시겠습니까?');

    if (!clickResult) return;

    const userId = this.getActiveUser().dataset['id'];

    const result = await deleteUser(userId);
    // console.log(result);

    const $firstUser = this.$usersList.querySelector('button');
    if ($firstUser) {
      const userId = $firstUser.dataset['id'];
      const name = $firstUser.textContent;

      this.userState.set({ userId, name });
    }
  }

  async init() {
    // userList 렌더링
    const users = await getUsers();
    const userListHTMl = this.getUserTemplate(users);
    this.$usersList.innerHTML = userListHTMl;

    // title render and setting init userState
    const $userTitle = $('#user-title strong');
    const $firstUser = this.$usersList.querySelector('button');
    if (!$firstUser) {
      $userTitle.innerHTML = '';
      return;
    }

    // setting init userState
    $userTitle.innerHTML = $firstUser.textContent;
    const userId = $firstUser.dataset['id'];
    const name = $firstUser.textContent;
    this.userState.set({ userId, name });
  }

  async render() {
    const users = await getUsers();
    const userListHTMl = this.getUserTemplate(users);

    this.$usersList.innerHTML = userListHTMl;
  }

  getUserTemplate(users) {
    const userId = this.userState.get().userId;
    let html = users.reduce(
      (acc, user, idx) =>
        (acc += `<button class="ripple ${
          (userId === undefined && idx === 0 ? 'active' : '') || userId === user._id ? 'active' : ''
        }" data-id=${user._id}>${user.name}</button>`),
      '',
    );

    html += `
    <button class="ripple user-create-button" data-action="createUser">+ 유저 생성</button>
    <button class="ripple user-delete-button" data-action="deleteUser">삭제 -</button>
  `;
    return html;
  }
}
