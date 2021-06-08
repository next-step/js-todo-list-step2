function UserTitle() {
  this.$userTitle = document.querySelector('#user-title');
  this.$state = '';
  
  this.setState = async (value) => {
    this.$state = value;  
    this.render();
  }

  this.template = () => {
    return `<span><strong>${this.$state}</strong>'s Todo List</span>`
  }
  
  this.render = () => {
    this.$userTitle.innerHTML = this.template();
  }
}

export default UserTitle;
