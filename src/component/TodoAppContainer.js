import api from '../util/api.js';
import Todocount from './Todocount.js';
import Todoinput from './Todoinput.js';
import Todolist from './Todolist.js';

class TodoAppContainer {
  constructor({ $app, initState }) {
    this.state = initState;
    const $todoapp = document.createElement('section');
    this.$todoapp = $todoapp;
    this.$todoapp.className = 'todoapp';
    $app.appendChild(this.$todoapp);

    new Todoinput({
      $todoapp,
      onKeyup: async ({ target, key }) => {
        if (key === 'Enter' && target.value) {
          const { _id } = this.state.activeUserInfo;
          const response = await api.addTodoItem(_id, target.value);
          if (!response.isError) {
            this.getNewTodos(_id);
          } else {
            //에러에러
          }

          target.value = '';
        }
      },
    });

    this.Todolist = new Todolist({
      $todoapp,
    });
    this.Todocount = new Todocount({
      $todoapp,
    });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.Todolist.setState({
      activeUserInfo: this.state.activeUserInfo,
      isLoading: this.state.isLoading,
    });
  }

  async getNewTodos(id) {
    this.setState({
      isLoading: true,
    });
    const response = await api.getUserInfo(id);
    if (!response.isError) {
      const data = response.data;
      this.setState({
        activeUserInfo: data,
        isLoading: false,
      });
    } else {
      //에러에러
    }
  }
}

export default TodoAppContainer;
