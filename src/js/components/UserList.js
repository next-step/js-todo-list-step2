class UserList {
  constructor($userList) {
    this.$userList = $userList;
    this.list = [];
  }

  setState(updatedList) {
    this.list = updatedList;
    this.render();
  }

  render() {
    console.log('render user-list');
  }
}