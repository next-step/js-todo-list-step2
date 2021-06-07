function UserTitle() {
  const $userTitle = document.querySelector('#user-title');
  let $state = '';
  
  this.setState = async (value) => {
    $state = value;  
    this.render();
  }

  this.template = () => {
    return `<span><strong>${$state}</strong>'s Todo List</span>`
  }
  
  this.render = () => {
    $userTitle.innerHTML = this.template();
  }
}

export default UserTitle;
