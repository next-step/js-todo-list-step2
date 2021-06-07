import { USER_API } from '../constant/constant.js';
import { hasName } from '../utils/utils.js';

class UserList {
  constructor($target, dataLoader, { onUpdateUser, onDeleteUser }) {
    this.$target = $target;
    this.$target.innerHTML = `<div class='user-list'></div>
    <button class='ripple user-create-button' data-action='createUser'>
    + 유저 생성
    </button>
    <button class='ripple user-delete-button' data-action='deleteUser'>
      삭제 -
    </button>`;
    this.state = {};
    this.dataLoader = dataLoader;
    this.addEvent(onUpdateUser, onDeleteUser);
  }

  setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  getUsers = async () => {
    return await this.dataLoader.getData(USER_API);
  };

  userListTemplate = () => {
    let template = '';
    for (const [key, user] of Object.entries(this.state.users)) {
      const selected = key === this.state.currentUser ? 'active' : '';
      template += `<button class='ripple ${selected}'>${user.name}</button>`;
    }
    return template;
  };

  addEvent = (onUpdateUser, onDeleteUser) => {
    const userCreateButton = this.$target.querySelector('.user-create-button');
    const userDeleteButton = this.$target.querySelector('.user-delete-button');
    const userButton = this.$target.querySelector('.user-list');

    const onUserCreateHandler = async () => {
      const name = prompt('추가하고 싶은 이름을 입력해주세요.');
      if (name) {
        const userName = name.trim();
        if (!userName || hasName(userName, this.state.users)) return;
        const newUser = {
          name: userName,
        };
        onUpdateUser(user);
        const user = await this.dataLoader.postData(USER_API, newUser);
      }
    };

    const onUserDeleteHandler = async () => {
      const name = prompt('삭제하고 싶은 이름을 입력해주세요.');
      if (name) {
        const userName = name.trim();
        if (!userName || !hasName(userName, this.state.users)) return;
        const id = this.state.users[userName]._id;
        onDeleteUser(userName);
        await this.dataLoader.deleteData(USER_API + `/${id}`);
      }
    };

    const onUserHandler = async ({target}) => {
      if (!(target instanceof HTMLButtonElement)) {
        return;
      }
      const id = this.state.users[target.textContent]._id;
      onUpdateUser(user);
      const user = await this.dataLoader.getData(USER_API + `/${id}`);
    };

    userCreateButton.addEventListener('click', onUserCreateHandler);
    userDeleteButton.addEventListener('click', onUserDeleteHandler);
    userButton.addEventListener('click', onUserHandler);
  };

  render = () => {
    const targetDOM = this.$target.querySelector('.user-list');
    const template = this.userListTemplate();
    targetDOM.innerHTML = '';
    targetDOM.insertAdjacentHTML('beforeend', template);
  };
}

export default UserList;
