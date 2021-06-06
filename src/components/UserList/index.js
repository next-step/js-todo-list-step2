import { getUser } from '../../user/controller.js';
export const UserList = () => {
  const dom = document.createElement('div');
  dom.className = 'user-list';

  const render = async () => {
    const users = await getUser().then((response) => response.json());
    dom.innerHTML = `${users
      .map((user) => {
        return `
        <button class="ripple">${user.name}</button>
        `;
      })
      .join('')}`;
  };
  render();
  return dom;
};
