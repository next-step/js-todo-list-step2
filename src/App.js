import Userlist from './component/Userlist.js';
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

    this.Usertitle = new Usertitle({
      $app,
      userName: this.state.userName,
    });
    this.Userlist = new Userlist({
      $app,
    });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.Usertitle.setState(this.state.userName);
    this.Userlist.setState({
      userList: this.state.userList,
      userName: this.state.userName,
    });
  }
  async init() {
    const userList = await api.getUsersList();
    const { name, todoList } = userList[0];
    const userNameList = userList.map((user) => user.name);
    this.setState({
      userList: userNameList,
      toDos: todoList,
      userName: name,
    });
  }
}

export default App;
