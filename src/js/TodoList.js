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

  async handleInputKeyup(event) {
    // todo => 제출
    if (event.key !== 'Enter') return;
    const { target } = event;
    const inputValue = target.value;
    const userId = USERLIST.querySelector('.active').getAttribute('data-id');
    const data = {
      _id: '1',
      contents: inputValue,
      isCompleted: false,
      priority: 'NONE'
    };
    const response = await fetch(`${BASE_URL}${USER_PATH}${userId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...data
      })
    });
    target.value = '';
  }

  async handleClickUser(event) {
    const { target } = event;
    const userButtons = USERLIST.querySelectorAll('button[data-active]');
    const userTitle = $('#user-title');
    userButtons.forEach(userButton => {
      if (userButton.classList.contains('active')) {
        userButton.classList.remove('active');
      }
    });
    target.classList.add('active');
    userTitle.innerHTML = `<strong>${target.innerText}</strong>'s Todo List`;
    userTitle.setAttribute('data-username', target.innerText);
    const id = target.getAttribute('data-id');
    $('.todo-list').innerHTML = '';
    const response = await fetch(`${BASE_URL}${USER_PATH}${id}/items/`, {});
    const userTodoList = await response.json();
    await console.log(userTodoList);
    userTodoList.forEach(userTodoListElement => {
      $('.todo-list').insertAdjacentHTML(
        'afterbegin',
        this.createTodoListElement(userTodoListElement)
      );
    });
    const newTodoInput = $('.new-todo');
    newTodoInput.addEventListener(
      'keyup',
      await this.handleInputKeyup.bind(this)
    );
    // newTodoInput.addEventListener('dblclick', this.test2.bind(this));
  }

  async createUser(userName) {
    const user = { name: userName };
    const response = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      headers: { 'Contents-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  }

  async deleteUser(userId) {
    const response = await fetch(`${BASE_URL}${USER_PATH}${userId}`, {
      method: 'DELETE'
    });
  }

  async handleCreateUser() {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    await this.createUser(userName);
    this.render();
  }

  async handleDeleteUser() {
    const userButton = USERLIST.querySelector('button.active');
    const userId = userButton.getAttribute('data-id');
    await this.deleteUser(userId);
    this.render();
  }

  async addEvents() {
    const userCreateButton = $('.user-create-button');
    const userDeleteButton = $('.user-delete-button');
    const userButtons = USERLIST.querySelectorAll('button');
    const firstUserButton = userButtons[0];

    firstUserButton.classList.add('active');
    for (let index = 0; index < userButtons.length - 2; index++) {
      if (userButtons[index].hasAttribute('data-active')) {
        userButtons[index].addEventListener(
          'click',
          await this.handleClickUser.bind(this)
        );
      }
    }
    userCreateButton.addEventListener(
      'click',
      await this.handleCreateUser.bind(this)
    );
    userDeleteButton.addEventListener(
      'click',
      await this.handleDeleteUser.bind(this)
    );
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
    await this.addEvents();
  }

  async init() {
    await this.render();
  }
}

export default TodoList;
