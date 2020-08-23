import { validateUserName, validateInstance } from "../utils.js";
function UserTitle($target, activeUser) {
  validateInstance(UserTitle, this);
  this.activeUser = activeUser;

  this.setState = (newActiveUser) => {
    validateUserName(newActiveUser);
    this.activeUser = newActiveUser;
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
        <span><strong>${this.activeUser}</strong>'s Todo List</span>
      `;
  };

  this.render();
}

export default UserTitle;
