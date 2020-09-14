import { getter } from '../../store/index.js';

const UserTitle = () => {
  const userName = getter.userName();
  const getTitleName = userName ? `${userName}\'s` : '';

  return `
    <h1 id="user-title" data-username="eastjun">
      <span><strong>${getTitleName}</strong>Todo List</span>
    </h1>
  `;
};

export default UserTitle;