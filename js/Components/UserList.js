import { userButtonHTML } from '../utils/template.js';
import { NODE } from '../utils/constant.js';

function UserList({ $target, userListState, onChangeUser }) {
  this.init = () => {
    this.$target = $target;

    const { users, name } = userListState;
    this.users = users;
    this.name = name;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
  };

  this.onClick = (e) => {
    if (e.target.nodeName !== NODE.BUTTON) return;

    const selectedName = e.target.innerText;
    onChangeUser(selectedName);
  };

  this.setState = (nextState) => {
    const { users, name } = nextState;
    this.users = users;
    this.name = name;

    this.render();
  };

  this.createUserListHTML = (users, selectedName) => {
    return (
      users.reduce((html, user) => {
        html += userButtonHTML(user.name, selectedName);
        return html;
      }, '') + ''
    );
  };

  this.render = () => {
    this.$target.innerHTML = this.createUserListHTML(this.users, this.name);
  };

  this.init();
}

export default UserList;
