import { store } from '../../store/index.js';
export const UserTitle = () => {
  const { selectedUser } = store.getState();
  return `
    <span><strong>${
      selectedUser === undefined ? 'jinhyun' : selectedUser[0].name
    }</strong>'s Todo List</span>

    `;
};
