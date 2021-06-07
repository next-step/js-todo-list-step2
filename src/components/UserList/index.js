import { getUser } from '../../user/controller.js';
export const UserList = async (userId) => {
  const users = await getUser();
  const btnStyle = (id) => {
    return userId === id ? 'active' : '';
  };
  return `${users
    .map((user) => {
      return `
        <button class="ripple ${btnStyle(user._id)}" data-id=${user._id}>${
        user.name
      }</button>
        `;
    })
    .join('')}`;
};
