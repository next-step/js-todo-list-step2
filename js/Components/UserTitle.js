function UserTitle($target, activeUser) {
  this.$target = $target;
  this.activeUser = activeUser;

  this.setState = (newActiveUser) => {
    this.activeUser = newActiveUser;
    this.render();
  };

  this.render = () => {
    this.$target.innerHTML = `
      <span><strong>${this.activeUser}</strong>'s Todo List</span>
    `;
  };

  this.render();
}

export default UserTitle;
