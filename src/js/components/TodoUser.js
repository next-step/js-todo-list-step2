import { getEl } from "@js/util";
import { getUser, createUser, deleteUser } from "@lib/api";

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

    if (action === 'createUser') return this._createUserHandler();
    if (action === 'deleteUser') return this._deleteUserHandler();
    if (_id === targetId) return;

    const { data } = await getUser(targetId);

    this.store.set({
      selectedUser: { ...data },
    });
  }

  async _createUserHandler() {
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');
    if (!name) return;
    if (name.length < 2) return alert('2글자 이상이어야 합니다.');

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
    if (!confirm(`${selectedUser.name}을 삭제하시겠습니까?`)) return;

    await deleteUser(selectedUser._id);
    const [currSelectedUser, ...restUsers] = users.filter((user) => user._id !== selectedUser._id);

    this.store.set({
      selectedUser: currSelectedUser,
      users: [currSelectedUser, ...restUsers],
    });
  }
}

export default TodoUser;
