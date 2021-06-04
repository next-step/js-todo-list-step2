class UserState {
  constructor() {
    this._user = {};
  }

  get() {
    return this._user;
  }

  set(updateUser) {
    this._user = updateUser;
  }
}

export default new UserState();
