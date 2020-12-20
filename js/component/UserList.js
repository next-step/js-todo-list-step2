import Component, { props } from "../core/Component.js";
import $store from "../store/index.js";

import UserListItem from "./UserListItem.js";

export default class UserList extends Component {
  users = [];

  init() {
    this.components = {
      "user-list-item": UserListItem,
    };

    this.events = {
      click: [this.createUser, this.selectUser, this.deleteUser],
    };

    $store.user.subscribe(this.setState.bind(this));
  }

  async createUser() {
    const name = prompt("추가하고 싶은 이름을 입력해주세요.");

    if (!name) return;
    if (name.trim().length < 2) {
      alert("2글자 이상이어야 합니다.");
      return;
    }

    const newUser = await $store.user.create(name);
    $store.user.setSelected(newUser);
  }

  selectUser({ target }) {
    const user = this.findUser(target.dataset.id);
    $store.user.setSelected(user);
  }

  async deleteUser() {
    const { _id, name } = $store.user.getSelected();
    const isYes = confirm(`${name}을 삭제하시겠습니까?`);
    if (!isYes) {
      return;
    }
    await $store.user.delete(_id);
  }

  findUser(id) {
    return this.users.find((user) => user._id === id);
  }

  userListItem(user) {
    return `
      <user-list-item
        key="${user._id}"
        ${props(user)}
      >
      </user-list-item>
    `;
  }

  async render() {
    this.users = await $store.user.getAll();

    return `
      <div class="user-list">
        ${this.users.map(this.userListItem).join("")}
        <div>
          <button class="ripple user-create-button" data-action="createUser">+ 유저 생성</button>
          <button class="ripple user-delete-button" data-action="deleteUser">삭제 -</button>
        </div>
      </div>
    `;
  }
}
