import TodoAppContainer from './component/TodoAppContainer.js';
import Userlist from './component/Userlist.js';
import Usertitle from './component/Usertitle.js';
import api from './util/api.js';

class App {
  constructor($app) {
    this.state = {
      userList: [],
      todoList: [],
      activeName: 'unknown',
      isLoading: true,
    };
    this.init();

    this.Usertitle = new Usertitle({
      $app,
      activeName: this.state.activeName,
    });

    this.Userlist = new Userlist({
      $app,
    });
    this.TodoAppContainer = new TodoAppContainer({
      $app,
      initState: this.state,
    });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.Usertitle.setState(this.state.activeName);
    this.Userlist.setState({
      userList: this.state.userList.map((user) => user.name),
      activeName: this.state.activeName,
    });
    this.TodoAppContainer.setState(this.state);
  }
  async init() {
    const response = await api.getUsersList();

    if (!response.isError) {
      const userList = response.data;
      const { name, todoList } = userList[0];

      this.setState({
        userList,
        todoList,
        activeName: name,
        isLoading: false,
      });
    } else {
      //에러처리
    }
  }
}

export default App;
