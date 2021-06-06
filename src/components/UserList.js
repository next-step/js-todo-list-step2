import { userControlButtonTemplate } from '../template.js';

export default class UserList {
  constructor({ onSelect, onAdd }) {
    this.$userList = document.querySelector('#user-list');

    this.$userList.addEventListener('click', (event) => this.selectUser(event, onSelect));
    this.$userList.addEventListener('click', (event) => this.addUser(event, onAdd));
  }

  render(usersTemplate) {
    this.$userList.innerHTML = usersTemplate.join('') + userControlButtonTemplate;
  }

  selectUser(event, onSelect) {
    const userTarget = event.target;
    if (!userTarget.classList.contains('ripple') || userTarget.id === '') return;
    onSelect({ _id: userTarget.id, name: userTarget.innerText });
  }

  async addUser(event, onAdd) {
    const addUserButtonTarget = event.target;
    if (!addUserButtonTarget.classList.contains('user-create-button')) return;
    onAdd();
  }
}
