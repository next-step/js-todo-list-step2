/* eslint-disable class-methods-use-this */
import { BASE_URL, USER_PATH, USERLIST, $ } from './constants.js';

class TodoList {
  constructor() {
    this.userInfos = {};
    this.init();
  }

  createNonPriorityElement(userTodoListElement) {
    return `
			<select class="chip select">
			<option value="NONE selected">순위</option>
			<option value="FIRST">1순위</option>
			<option value="SECOND">2순위</option>
			</select>
			${userTodoListElement.contents}
		`;
  }

  createPriorityElement(userTodoListElement) {
    return `
			<span class="
				chip ${userTodoListElement.priority === 'FIRST' ? 'primary' : 'secondary'}">
				${userTodoListElement.priority === 'FIRST' ? '1순위' : '2순위'}
			</span>
			${userTodoListElement.contents}
		`;
  }

  createTodoListElement(userTodoListElement) {
    return `
			<li class data-id=${userTodoListElement._id}>
			<div class="view">
				<input class="toggle" type="checkbox" ${userTodoListElement.isCompleted} />
				<label class="label">
				${
          userTodoListElement.priority === 'NONE'
            ? this.createNonPriorityElement(userTodoListElement)
            : this.createPriorityElement(userTodoListElement)
        }
				</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="완료된 타이틀" />
			</li>
		`;
  }

  async handleClickUser(event) {
    const { target } = event;
    const userButtons = USERLIST.querySelectorAll('button[data-active]');
    userButtons.forEach(userButton => {
      if (userButton.classList.contains('active')) {
        userButton.classList.remove('active');
      }
    });
    target.classList.add('active');
    const id = target.getAttribute('data-id');

    $('.todo-list').innerHTML = '';
    const response = await fetch(`${BASE_URL}${USER_PATH}${id}/items/`, {});
    const userTodoList = await response.json();
    userTodoList.forEach(userTodoListElement => {
      $('.todo-list').insertAdjacentHTML(
        'afterbegin',
        this.createTodoListElement(userTodoListElement)
      );
    });
  }

  async init() {
    await this.render();
    // todo: first user todo render
    const userCreateButton = document.querySelector('.user-create-button');
    const userButtons = USERLIST.querySelectorAll('button');
    const firstUserButton = userButtons[0];

    firstUserButton.classList.add('active');
    userCreateButton.addEventListener(
      'click',
      this.handleCreateUser.bind(this)
    );
    userButtons.forEach(userButton => {
      if (!userButton.hasAttribute('data-action'))
        userButton.addEventListener('click', this.handleClickUser.bind(this));
    });
  }

  async createUser(userName) {
    const user = { name: userName };
    const response = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }

  async handleCreateUser() {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    await this.createUser(userName);
    this.render();
  }

  appendUserInfoButton(user) {
    return `
			<button class="ripple" data-id="${user._id}" data-active>${user.name}</button>
		`;
  }

  async returnUsers() {
    const response = await fetch(`${BASE_URL}${USER_PATH}`);
    const users = await response.json();
    return users;
  }

  deleteExistingUserButtons() {
    const userButtonCount =
      $('#user-list').querySelectorAll('button').length - 2;
    for (let i = 0; i < userButtonCount; i++) {
      const button = $('#user-list').querySelector('button');
      $('#user-list').removeChild(button);
    }
  }

  drawUserButtons() {
    this.userInfos.forEach(userInfo => {
      $('#user-list').insertAdjacentHTML(
        'afterbegin',
        this.appendUserInfoButton(userInfo)
      );
    });
  }

  renderUserButtons() {
    this.deleteExistingUserButtons();
    this.drawUserButtons();
  }

  async render() {
    this.userInfos = await this.returnUsers();
    this.renderUserButtons();
  }
}

export default TodoList;
