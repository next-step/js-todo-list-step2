import Component from "../core/Component.js";

const UserListItem = ({ id: _id, name, active }) => {
  return `
    <button 
      class="ripple  ${active ? " active" : ""}"
      data-action="select"
      data-id=${_id}>
      ${name}
    </button>
  `;
};

export default class UserList extends Component {
  users = [];

  init() {
    this.events = {
      click: [this.createUser],
    };
  }

  createUser({ target }) {
    if (target.dataset.action !== "create") {
      return;
    }
    const name = prompt("추가하고 싶은 이름을 입력해주세요.");

    if (!name) return;
    if (name.trim().length < 2) {
      alert("2글자 이상이어야 합니다.");
      return;
    }

    this.users.push({ name });
    this.setState();
  }

  render() {
    // TODO: api를 통한 통신
    if (!this.users) {
      this.users = [];
    }

    return `
      ${this.users.map(UserListItem).join("")}
      <button class="ripple user-create-button" data-action="create">+ 유저 생성</button>
    `;
  }
}
