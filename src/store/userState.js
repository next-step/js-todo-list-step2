class UserState {
  constructor() {
    this._user = {};
    this.observers = [];
  }

  get() {
    return this._user;
  }

  set(updateUser) {
    this._user = updateUser;
    this.publish();
  }

  subscribe(observer) {
    this.observers = this.observers.concat(observer);
  }

  publish() {
    console.log('notify', this._user);
    this.observers.forEach((cb) => cb());
  }
}

export default new UserState();
