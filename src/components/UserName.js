function UserName() {
  this.render = user => {
    const userName = document.querySelector('#user-title strong');
    if (user.name === '') return;
    userName.textContent = user.name;
  };
}
export default UserName;
