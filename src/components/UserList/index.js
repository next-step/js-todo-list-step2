import { getUser } from '../../user/controller.js';
export const UserList = async () => {
  const users = await getUser();
  return `${users
    .map((user) => {
      return `
        <button class="ripple">${user.name}</button>
        `;
    })
    .join('')}`;
};
