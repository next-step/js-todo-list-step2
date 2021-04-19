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
    if (event.key !== 'Enter') return;
    const { target } = event;
    const inputValue = target.value;
    if (inputValue.length < 2) {
      alert("todoitem은 최소 2글자 이상이어야 합니다.");
      return;
    }

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
    await console.log(response);
    target.value = '';
    await this.render();
  }

  colorActiveUserButton(event) {
    const { target } = event;
    const userButtons = USERLIST.querySelectorAll('button[data-active]');
    const userTitle = $('#user-title');
    userButtons.forEach(userButton => {
      if (userButton.classList.contains('active')) {
        userButton.classList.remove('active');
      }
    });
    target.classList.add('active'); 
  }

  async handleClickUser(event) {
    console.log("clickuser");
    const { target } = event;
    const userTitle = $('#user-title');

    this.colorActiveUserButton(event);
    userTitle.innerHTML = `<strong>${target.innerText}</strong>'s Todo List`;
    userTitle.setAttribute('data-username', target.innerText);
    
    $('.todo-list').innerHTML = '';
    const id = target.getAttribute('data-id');
    const response = await fetch(`${BASE_URL}${USER_PATH}${id}/items/`, {});
    const userTodoList = await response.json();
    userTodoList.forEach(userTodoListElement => {
      $('.todo-list').insertAdjacentHTML(
        'afterbegin',
        this.createTodoListElement(userTodoListElement)
      );
    });
    
    const newTodoInput = $('.new-todo');
    newTodoInput.addEventListener(
        'keyup',
        // await this.handleInputKeyup.bind(this)
        await this.handleInputKeyup.bind(this)
      );
    // await this.render(); // TODO: 유저 리스트 실시간 렌더링
    // newTodoInput.addEventListener('dblclick', this.test2.bind(this));
  }

  async createUser(userName) {
    const user = { name: userName };
    const response = await fetch(`${BASE_URL}${USER_PATH}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    // await console.log(response);
    this.render();
  }

  async deleteUser(userId) {
    const response = await fetch(`${BASE_URL}${USER_PATH}${userId}`, {
      method: 'DELETE'
    });
  }

  async handleCreateUser() {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.');
    if (userName.length < 2) {
      alert('유저의 이름은 최소 2글자 이상이어야 합니다.')
      return;
    }
    await this.createUser(userName);
    // this.render();
    await this.render();
  }

  async handleDeleteUser(event) {
    // console.log(event.target);
    const userButton = USERLIST.querySelector('button.active');
    const userName = userButton.innerText;
    if (confirm(`${userName}을 삭제하시겠습니까?`))
    {
      const userId = userButton.getAttribute('data-id');
      await this.deleteUser(userId);
      await this.init();
      return;
    }
    // this.render();
    // await this.render();
  }

  async addEvents() {
    console.log("addevents");
    const userCreateButton = $('.user-create-button');
    const userDeleteButton = $('.user-delete-button');
    const userButtons = USERLIST.querySelectorAll('button');
    for (let index = 0; index < userButtons.length - 2; index++) {
      if (userButtons[index].hasAttribute('data-active')) {
        userButtons[index].addEventListener(
          'click',
          await this.handleClickUser.bind(this)
        );
      }
    }
    userCreateButton.addEventListener('click', await this.handleCreateUser.bind(this));
    userDeleteButton.addEventListener('click', await this.handleDeleteUser.bind(this));
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


  async renderUserButtons() {
    this.deleteExistingUserButtons();
    this.drawUserButtons();
  }

  async render() {
    // TODO: currentuser 설정
    this.userInfos = await this.returnUsers();
    await this.renderUserButtons();
    await this.addEvents();
    
  }

  async init() {
    // init() {
      await this.render();
      
      const userButtons = USERLIST.querySelectorAll('button');
      const firstUserButton = userButtons[0];
      const userTitle = $('#user-title');

      // TODO: Render first user's TODOLIST
      userTitle.innerHTML = `<strong>${firstUserButton.innerText}</strong>'s Todo List`;
      userTitle.setAttribute('data-username', firstUserButton.innerText);
      firstUserButton.classList.add('active');
  }
}

export default TodoList;

// Fix todo
// 1. event 중복
// 2. currentUser 설정
