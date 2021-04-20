import { UserTitleTemplate } from '../Config/Template.js';
import { subscribeSelectedUser } from '../Store.js';

function UserTitle() {
  const render = (selectedUser) => {
    const userTitleElement = document.getElementById('user-title');
    userTitleElement.dataset.username = selectedUser.name;
    userTitleElement.innerHTML = UserTitleTemplate(selectedUser);
  };

  subscribeSelectedUser(render);
}

export default UserTitle;
