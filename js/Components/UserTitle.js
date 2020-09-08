import { validateUserName, validateInstance } from "../utils.js";
function UserTitle($target, activeUser) {
  validateInstance(UserTitle, this);
  this.state = {
    activeUser,
  };

  this.setState = (state) => {
    if (state?.activeUser) {
      validateUserName(state.activeUser);
      this.state.activeUser = state.activeUser;
    }
    this.render();
  };

  this.render = () => {
    $target.innerHTML = `
        <span><strong>${this.state.activeUser}</strong>'s Todo List</span>
      `;
  };

  this.render();
}

export default UserTitle;
