import Usertitle from './component/Usertitle.js';
import api from './util/api.js';

class App {
  constructor($app) {
    this.state = {
      userList: [],
      toDos: [],
      userName: 'unknown',
    };
    this.init();

    this.userTitle = new Usertitle({
      $app,
      userName: this.state.userName,
    });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.userTitle.setState(this.state.userName);
  }
  async init() {
    const initData = await api.getUserList();
    console.log(initData);
  }
}

export default App;
