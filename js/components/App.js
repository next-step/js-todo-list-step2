// core
import eventChannel from '../core/eventChannel.js';
const { done, when } = eventChannel;

// child components
import UserContainer from './UserContainer.js';
import TodoContainer from './TodoContainer.js';

// constants
import { ACTIONS } from '../constants/index.js';
const { VIEW, STORE } = ACTIONS;

export default class App {
  constructor($target) {
    this.$target = $target;

    this.userContainer = new UserContainer();
    this.todoContainer = new TodoContainer();

    this.render();
    this.connect();
  }

  connect() {
    when(STORE.UPDATE_ALL, (props) => this.setState(props));
    done(VIEW.INIT);
  }

  setState({ users, currentUser, todoList, currentFilter }) {
    this.userContainer.setState({ users, currentUser });
    this.todoContainer.setState({ todoList, currentUser, currentFilter });
  }

  render() {
    this.$target.appendChild(this.userContainer.$el);
    this.$target.appendChild(this.todoContainer.$el);
  }
}
