import { USER_API } from "../constant/constant.js";
import { validName } from '../utils/utils.js';

class UserList {
  constructor($target, dataController, { onUpdateUser }) {
    this.$target = $target;
    this.$target.innerHTML = `<div class="user-list"></div>
    <button class="ripple user-create-button" data-action="createUser">
    + 유저 생성
    </button>
    <button class="ripple user-delete-button" data-action="deleteUser">
      삭제 -
    </button>`;
    this.state = {};
    this.dataController = dataController;
    this.addEvent(onUpdateUser);
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  getUsers = async () => {
    try {
      return await this.dataController.getData(USER_API);
    } catch (e) {
      console.error(e);
    }
  };

  userListTemplate = () => {
    let template = '';
    for (const [key, user] of Object.entries(this.state)) {
      template += `<button class="ripple">${user.name}</button>`;
    }
    return template;
  };

  addEvent = (onUpdateUser) => {
    const userCreateButton = this.$target.querySelector(".user-create-button");
    const userDeleteButton = this.$target.querySelector(".user-delete-button");
    const userButton = this.$target.querySelector('.user-list');

    const onUserCreateHandler = async () => {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      if (userName && validName(userName.trim(), this.state)) {
        const newUser = {
          name: userName
        };
        try {
          const user = await this.dataController.postData(USER_API, newUser);
          onUpdateUser(user);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const onUserHandler = async (event) => {
      const { target } = event;
      const id = this.state[`${target.textContent}`]['_id'];
      const user = await this.dataController.getData(USER_API+`/${id}`);
      onUpdateUser(user);
    }

    userCreateButton.addEventListener("click", onUserCreateHandler);
    userButton.addEventListener("click", onUserHandler);
  };

  render = () => {
    const targetDOM = this.$target.querySelector('.user-list');
    const template = this.userListTemplate();
    targetDOM.innerHTML = '';
    targetDOM.insertAdjacentHTML("beforeend", template);
  };
}

export default UserList;
