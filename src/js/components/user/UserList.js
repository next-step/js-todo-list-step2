export default class UserList {
  constructor({ appData }) {
    this.userListUl = document.querySelector('#user-list .users');
    this.appData = appData;

    this.render();
  }

  handleAddClass() {
    this.userListUl.querySelector('.ripple').classList.add('active');
  }

  render() {
    this.appData && this.handleAddClass();
    this.userListUl.innerHTML = this.appData
      .map((data, i) => {
        return `<button id="${data._id}" class="ripple">${data.name}</button>`;
      })
      .join('');
  }
}
