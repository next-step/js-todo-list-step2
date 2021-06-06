import { $userTitle, $userList, $sectionContainer } from '../Dom/index.js';
import { UserTitle } from '../UserTitle/index.js';
import { UserListContainer } from '../UserListContainer/index.js';
import { UserList } from '../UserList/index.js';
const render = async () => {
  $userTitle.innerHTML = UserTitle();
  $userList.innerHTML = await UserList();
  $sectionContainer.innerHTML = UserListContainer();
};

export default render;
