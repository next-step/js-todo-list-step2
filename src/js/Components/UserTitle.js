import { UserTitleTemplate } from '../Config/Template.js';
import { subscribeUserList } from '../Store.js';

function UserTitle() {
  const render = (userList, selectedUser) => {
    const userTitleElement = document.getElementById('user-title');
    userTitleElement.dataset.username = selectedUser.name;
    userTitleElement.innerHTML = UserTitleTemplate(selectedUser);
  };

  subscribeUserList(render);
}

export default UserTitle;
