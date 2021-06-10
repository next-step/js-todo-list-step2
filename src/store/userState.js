import Subject from '@core/Subject.js';

class UserState extends Subject {
  constructor() {
    super();
    this._user = {};
  }

  get() {
    return this._user;
  }

  set(updateUser) {
    this._user = updateUser;
    this.publish();
  }
}

export default new UserState();
