export default class TodoHeader {
  constructor() {
    this.userTitleElement = document.querySelector('#user-title');
    this.selectedUser = '';
  }

  setState(userName) {
    this.selectedUser = userName;
    this.render();
  }

  render() {
    this.userTitleElement.innerHTML = `<span><strong>${this.selectedUser}</strong>'s Todo List</span>`;
  }
}
