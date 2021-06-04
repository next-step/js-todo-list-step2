import CONSTANT from '../constants.js';
import api from '../util/api.js';
import { changeLabel } from '../util/changeLabel.js';
import { changeTodo } from '../util/changeTodo.js';
import { editTodo } from '../util/editTodo.js';
import { showError } from '../util/error.js';
import { filterTodo } from '../util/filterTodo.js';
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
      onClick: (itemId, className) => {
        const userId = this.state.activeUserInfo._id;
        changeTodo(userId, itemId, className, this.getNewTodos.bind(this));
      },
      onDbClick: (target) => {
        const userId = this.state.activeUserInfo._id;
        editTodo(userId, target, this.getNewTodos.bind(this));
      },
      onChange: (itemId, value) => {
        const userId = this.state.activeUserInfo._id;
        changeLabel(userId, itemId, value, this.getNewTodos.bind(this));
      },
    });
    this.Todocount = new Todocount({
      $todoapp,
      onClick: (className) => {
        if (
          [CONSTANT.ACTIVE, CONSTANT.ALL, CONSTANT.COMPLETED].includes(
            className
          )
        ) {
          const filtedTodos = filterTodo(
            className,
            this.state.activeUserInfo.todoList
          );
          this.setState({ todoList: filtedTodos, filter: className });
        }
        if (CONSTANT.CLEAR_COMPLETED === className) {
          const userId = this.state.activeUserInfo._id;
          changeTodo(userId, null, className, this.getNewTodos.bind(this));
        }
      },
    });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.Todolist.setState({
      todoList: this.state.todoList,
      isLoading: this.state.isLoading,
    });
    this.Todocount.setState({
      filter: this.state.filter,
      counter: this.state.todoList.length,
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
      todoList: data.todoList,
      isLoading: false,
    });
  }
}

export default TodoAppContainer;
