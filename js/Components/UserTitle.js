function UserTitle($target) {
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = `
      <span><strong>eastjun</strong>'s Todo List</span>
    `;
  };

  this.render();
}

export default UserTitle;
