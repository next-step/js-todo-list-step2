import selectedUserStore from '../modules/selectedUser.js';

class UserItem {
  static render(userId, name) {
    const isSelected = userId === selectedUserStore.getState()._id;

    return `<button data-id="${userId}" class="ripple${
      isSelected ? ' active' : ''
    }" >${name}</button>`;
  }
}

export default UserItem;
