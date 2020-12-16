import User from './User.js';

const App = class extends Set {
  constructor() {
    super();
  }

  static load(json) {
    const app = new App();
    json.forEach((f) => {
      app.addUser(User.load(f));
    });
    return app;
  }

  addUser(user) {
    if (!user instanceof User) return console.log('invalid User');
    super.add(user);
  }

  removeUser(user) {
    if (!user instanceof User) return console.log('invalid User');
    super.delete(user);
  }

  getUsers() {
    return [...super.values()];
  }

  add() {}

  delete() {}

  clear() {}

  values() {}
};

export default App;
