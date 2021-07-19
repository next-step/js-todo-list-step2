import { $ } from '../utils/selectors.js';

function UserName() {
  this.render = user => {
    const userName = $('#user-title strong');
    if (user.name === '') return;
    userName.textContent = user.name;
  };
}
export default UserName;
