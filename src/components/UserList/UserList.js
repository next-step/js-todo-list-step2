import { $ } from '@utils/utils.js';
import { DOM_ID, MESSAGGE } from '@constants/constants.js';

import { userService } from '@api/user.js';
import { todoListService } from '@api/todolist.js';

import todoState from '@store/todoState.js';
import userState from '@store/userState.js';

export default class UserList {
  constructor() {
    this.$usersList = $(DOM_ID.USER_LIST);
    this.userState = userState;
    this.todoState = todoState;

    this.userState.subscribe(this.changeTodoListByUser.bind(this));
    this.addEvent();

    return (async () => {
      await this.init();
      return this;
    })();
  }

  addEvent() {
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

  async changeUser(target) {
    if (!target.classList.contains('ripple')) return;

    // Change User Active
    const $usersList = this.$usersList.querySelectorAll('button.ripple');
    [...$usersList].map((element) => element.classList.remove('active'));
    target.classList.add('active');

    const userId = target.dataset['id'];
    const name = target.textContent;

    this.userState.set({ userId, name });

    // Change User Title
    const $userTitle = $(DOM_ID.USER_TITLE_RENDER);
    $userTitle.textContent = name;
  }

  async createUser() {
    const userName = prompt(MESSAGGE.CREATE_USER);

    if (userName === null) return;
    if (userName.length < 2) {
      alert(MESSAGGE.CREATE_USER_VALIDATE_ERROR);
      return;
    }

    const result = await userService.createUser({ name: userName });
    this.userState.set({ userId: result._id, name: result.name });
  }

  async deleteUser() {
    const clickResult = confirm(MESSAGGE.DELETE_USER);
    if (!clickResult) return;

    const userId = this.userState.get().userId;
    const result = await userService.deleteUser(userId);
    // 삭제가 정상동작 하지 않으면 처리 취소
    if (!result['message']) return;

    await this.render();

    const $firstUser = this.$usersList.querySelector('button');
    if (!$firstUser) return;

    if ($firstUser) {
      const userId = $firstUser.dataset['id'];
      const name = $firstUser.textContent;
      this.userState.set({ userId, name });
    }
  }

  // user의 상태가 변할 시 수행 - todoListState 를 user 값에 맞게 변환
  async changeTodoListByUser() {
    // user의 todoList 값 변경
    const user = this.userState.get();
    const todoList = await todoListService.getTodoList(user.userId);
    this.todoState.set(todoList);
  }

  async init() {
    // userList 렌더링
    const users = await userService.getUsers();
    const userListHTMl = this.getUserTemplate(users);
    this.$usersList.innerHTML = userListHTMl;

    // title render and setting init userState
    const $userTitle = $(DOM_ID.USER_TITLE_RENDER);
    const $firstUser = this.$usersList.querySelector('button');
    if (!$firstUser) {
      $userTitle.textContent = '';
      return;
    }

    // setting init userState
    $userTitle.textContent = $firstUser.textContent;
    const userId = $firstUser.dataset['id'];
    const name = $firstUser.textContent;
    this.userState.set({ userId, name });
  }

  async render() {
    const users = await userService.getUsers();
    const userListHTMl = this.getUserTemplate(users);

    this.$usersList.innerHTML = userListHTMl;
  }

  getUserTemplate(users) {
    const userId = this.userState.get().userId;
    let html = users.reduce(
      (acc, user, idx) =>
        (acc += `
          <button class="ripple ${
            (userId === undefined && idx === 0 ? 'active' : '') || userId === user._id
              ? 'active'
              : ''
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
