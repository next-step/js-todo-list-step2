import api from '../util/api.js';
import { changeLabel } from '../util/changeLabel.js';
import { changeTodo } from '../util/changeTodo.js';
import { editTodo } from '../util/editTodo.js';
import { showError } from '../util/error.js';
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
          if (target.value.length < 2) {
            return showError({ message: '두 글자 이상이어야합니다!' });
          }
          const { _id } = this.state.activeUserInfo;
          const response = await api.addTodoItem(_id, target.value);
          if (response.isError) {
            return showError(response.data);
          }
          this.getNewTodos(_id);

          target.value = '';
        }
      },
    });

    this.Todolist = new Todolist({
      $todoapp,
      onClick: async (itemId, className) => {
        const userId = this.state.activeUserInfo._id;
        await changeTodo(
          userId,
          itemId,
          className,
          this.getNewTodos.bind(this)
        );
      },
      onDbClick: async (target) => {
        const userId = this.state.activeUserInfo._id;
        editTodo(userId, target, this.getNewTodos.bind(this));
      },
      onChange: async (itemId, value) => {
        const userId = this.state.activeUserInfo._id;
        changeLabel(userId, itemId, value, this.getNewTodos.bind(this));
      },
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
    const response = await api.getUserInfo(id);
    if (response.isError) {
      return showError(response.data);
    }
    const data = response.data;
    this.setState({
      activeUserInfo: data,
      isLoading: false,
    });
  }
}

export default TodoAppContainer;
