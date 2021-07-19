import { getUsers } from '../../user/controller.js';
import { store } from '../../store/index.js';
import { getUserList } from '../../store/dispatcher.js';

export const UserList = async (userId) => {
  const user = await getUsers();
  const btnStyle = (id) => {
    return userId === id ? 'active' : '';
  };
  store.dispatch(getUserList(user));
  const { userList } = store.getState();
  return `${userList
    .map((user) => {
      return `
        <button class="ripple ${btnStyle(user._id)}" data-id=${user._id}>${
        user.name
      }</button>
        `;
    })
    .join('')}`;
};
