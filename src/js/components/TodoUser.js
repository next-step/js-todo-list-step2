import { getEl } from "@js/util";
import { getUser, createUser, deleteUser } from "@lib/api";
import { ACTION, MESSAGES, VALIDATION } from "@constants/constant";

class TodoUser {
  constructor(store) {
    this.store = store;
    this.userListEl = getEl("#user-list");
    this.init();
  }

  init() {
    this.userListEl.addEventListener("click", this.usersPanelClickHandler.bind(this));
  }

  async usersPanelClickHandler({ target }) {
    const { _id } = this.store.get().selectedUser;
    const { action, _id: targetId } = target.dataset;

    if (action === ACTION.CREATE_USER) return this._createUserHandler();
    if (action === ACTION.DELETE_USER) return this._deleteUserHandler();
    if (!targetId || _id === targetId) return;

    const { data } = await getUser(targetId);

    this.store.set({
      selectedUser: { ...data },
    });
  }

  async _createUserHandler() {
    const name = prompt(MESSAGES.CREATE_USER);

    if (name === null) return;
    if (name.length < VALIDATION.MIN_USER_NAME) return alert(MESSAGES.INVALID_CREATE_USER);

    const { data } = await createUser(name);
    const _users = this.store.get().users.slice();
    const index = Math.floor(Math.random() * _users.length);
    _users.splice(index, 0, data);

    this.store.set({
      selectedUser: { ...data },
      users: [..._users],
    })
  }

  async _deleteUserHandler() {
    const { selectedUser, users } = this.store.get();

    if (!confirm(selectedUser.name + MESSAGES.DELETE_USER)) return;

    await deleteUser(selectedUser._id);
    const [currSelectedUser, ...restUsers] = users.filter((user) => user._id !== selectedUser._id);

    this.store.set({
      selectedUser: currSelectedUser,
      users: [currSelectedUser, ...restUsers],
    });
  }
}

export default TodoUser;
