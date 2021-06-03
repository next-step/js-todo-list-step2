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
    this.state = [];
    this.dataController = dataController;
    this.addEvent(onAddUser);
  }

  setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
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
    return this.state
      .map((user) => `<button class="ripple">${user.name}</button>`)
      .join("");
  };

  addEvent = (onAddUser) => {
    const onUserCreateHandler = async () => {
      const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
      if (userName && userName.trim()) {
        // const newUser = {
        //   _id: this.randomGenerator.getString(8),
        //   todoList: [],
        //   name: userName
        // };
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
