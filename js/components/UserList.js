export default class UserList {
  constructor({ $element, userList, activeUser, onSelectUser }) {
    this.$element = $element;
    this.userList = userList;
    this.activeUser = activeUser;

    this.$element.addEventListener('click', e => {
      if (e.target.nodeName === 'BUTTON') {
        onSelectUser(e.target.innerText);
      }
    });

    this.render();
  }

  render() {
    this.$element.innerHTML = this.userList
      .map(
        ({ name }) =>
          `<button class="ripple${this.activeUser === name ? ' active' : ''}">${name}</button>`
      )
      .join('');
  }

  setState(changeName) {
    this.activeUser = changeName;
    this.render();
  }
}
