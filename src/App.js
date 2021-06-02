import TodoAppContainer from './component/TodoAppContainer.js';
import Userlist from './component/Userlist.js';
import Usertitle from './component/Usertitle.js';
import api from './util/api.js';
import { createUser, deleteUser, selectUser } from './util/modifyUser.js';

class App {
  constructor($app) {
    this.state = {
      userList: null,
      activeUserInfo: null,
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
      onClick: async ({ target }) => {
        const callback = {
          'ripple user-create-button': createUser,
          'ripple user-delete-button': deleteUser,
          'ripple active': selectUser,
          // eslint-disable-next-line prettier/prettier
          'ripple': selectUser,
        }[target.className];
        if (!callback) return;

        callback({
          activeUserInfo: this.state.activeUserInfo,
          targetId: target.dataset.id,
          setState: this.setState.bind(this),
        });
      },
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
      userList: this.state.userList.map(({ _id, name }) => {
        return { _id, name };
      }),
      activeName: this.state.activeName,
    });
    this.TodoAppContainer.setState(this.state);
  }
  async init() {
    const response = await api.getUsersList();

    if (!response.isError) {
      const userList = response.data;
      const activeUserInfo = userList[0];

      this.setState({
        userList,
        activeUserInfo,
        activeName: activeUserInfo.name,
        isLoading: false,
      });
    } else {
      //에러처리
    }
  }
}

export default App;
