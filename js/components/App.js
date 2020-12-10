import User from './User.js';
const App = class extends Set{
  constructor () {
    super();
    this.userNames = [];
  }
  static load(json){
    const app = new App();
    json.forEach(f=>{
      app.setUserNames(User.load(f).getInfo());
      app.addUser(User.load(f));
    });
    return app
  }

  addUser(user){
    if(!user instanceof User) return console.log('invalid User');
    super.add(user);
  }

  removeUser(user){
    if(!user instanceof User) return console.log('invalid User');
    super.delete(user);
  }

  getUsers(){
    return [...super.values()];
  }
  setUserNames(user){
    this.userNames.push(user);
  }

  getUserNames(){
    return this.userNames;
  }
  add(){};
  delete(){};
  clear(){};
  values(){};
}

export default App;
