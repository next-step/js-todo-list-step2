import { GET_USER_LIST } from "../constant/constant.js";

class UserList {
  constructor($target, dataController) {
    this.$target = $target;
    this.$target.innerHTML = `<div class="user-list"></div>
    <button class="ripple user-create-button" data-action="createUser">
    + 유저 생성
    </button>
    <button class="ripple user-delete-button" data-action="deleteUser">
      삭제 -
    </button>`;
    this.state = [];
    this.dataController = dataController;
    this.addEvent();
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  getUsers = async () => {
    return await this.dataController.getData(GET_USER_LIST);
  };

  userListTemplate = () => {
    return this.state
      .map((user) => `<button class="ripple">${user.name}</button>`)
      .join("");
  };

  addEvent = () => {
    const onUserCreateHandler = () => {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    };
    const userCreateButton = this.$target.querySelector(".user-create-button");
    userCreateButton.addEventListener("click", onUserCreateHandler);
  };

  render = () => {
    const targetDOM = this.$target.querySelector('.user-list');
    const template = this.userListTemplate();
    targetDOM.innerHTML = '';
    targetDOM.insertAdjacentHTML("beforeend", template);
  };
}

export default UserList;
