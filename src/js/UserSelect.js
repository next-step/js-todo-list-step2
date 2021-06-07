export default function UserListBtn() {
  const $userList = document.querySelector('#user-list');
  let userList = {};


  this.setState = (newState) => {
    userList = newState;
    this.render();
  }

  this.template = () => {
  
    const userSelectHtml = userList.map(user => {
    return `
    <button class="${user.active ? "ripple active": "ripple"}" id="${user._id}">
      ${user.name}
    </button>
    `}).join('');
    
      return userSelectHtml;
    }

    this.render = () => {
      $userList.innerHTML = this.template();
    }
}



