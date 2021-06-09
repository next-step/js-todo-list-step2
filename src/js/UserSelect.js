export default function UserListBtn() {
  this.$userList = document.querySelector('#user-list');
  this.userList = {};


  this.setState = (newState) => {
    this.userList = newState;
    this.render();
  }

  this.template = () => {
  
    const userSelectHtml = this.userList.map(user => {
    return `
    <button class="${user.active ? "ripple active": "ripple"}" id="${user._id}">
      ${user.name}
    </button>
    `}).join('');
    
      return userSelectHtml;
    }

    this.render = () => {
      this.$userList.innerHTML = this.template();
    }
}



