import { GET_USER_LIST, CREATE_NEW_USER } from "../constant/constant.js";

class UserList {
  constructor($target, dataController, { onAddUser }) {
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
    this.addEvent(onAddUser);
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  getUsers = async () => {
    try {
      return await this.dataController.getData(GET_USER_LIST);
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

  addEvent = (onAddUser) => {
    const userCreateButton = this.$target.querySelector(".user-create-button");
    const userDeleteButton = this.$target.querySelector(".user-delete-button");
    const userButton = this.$target.querySelector('.user-list');

    const onUserCreateHandler = async () => {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      if (userName && userName.trim()) {
        const newUser = {
          name: userName
        };
        try {
          const res = await this.dataController.postData(CREATE_NEW_USER, newUser);
          onAddUser(res);
        } catch (e) {
          console.error(e);
        }
      }
    };

    const onUserHandler = async (event) => {
      const { target } = event;
      console.log(target.textContent);
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
