import { getUser } from '../../user/controller.js';
export const UserList = async () => {
  const users = await getUser().then((response) => response.json());
  return `${users
    .map((user) => {
      return `
        <button class="ripple">${user.name}</button>
        `;
    })
    .join('')}`;
};
