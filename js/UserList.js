import api from './util/api.js';

export default class UserList {
  constructor({
    username,
    userArray,
    data,
    $targetUserTitle,
    $targetUserList,
    onClickUser,
  }) {
    this.username = username;
    this.userArray = userArray;
    this.data = data;
    this.$targetUserTitle = $targetUserTitle;
    this.$targetUserList = $targetUserList;

    this.$targetUserList.addEventListener('click', (e) => {
      if (e.target.className === 'ripple') {
        // const userNodeList = document.querySelectorAll('.ripple');
        // userNodeList.forEach((node) => {
        //   node.classList.remove('active');
        // });
        // console.log(e.target.textContent);
        onClickUser(e.target.textContent);
        // e.target.classList.add('active');
      }
    });

    this.render();
  }

  setState(selectedUsername) {
    this.username = selectedUsername;
    this.render();
  }
  async render() {
    this.userArray = await api.fetchUsers();
    const renderHTMLText = `<span><strong>${this.username}</strong>'s Todo List</span>`;
    this.$targetUserTitle.innerHTML = renderHTMLText;

    const renderHTMLList =
      this.userArray &&
      this.userArray
        .map((user) => {
          return `<button class="${user.name === this.username ? 'ripple active' : 'ripple'}">${user.name}</button>`
        }).join('');
    this.$targetUserList.innerHTML = renderHTMLList;
  }
}
