import UserContainer from './UserContainer.js';
import TodoContainer from './TodoContainer.js';
import eventChannel from '../core/eventChannel.js';
import { VIEW, STORE } from '../actions.js';

const { done, when } = eventChannel;

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
    this.todoContainer.setState({ todoList, currentFilter });
  }

  render() {
    this.$target.appendChild(this.userContainer.$el);
    this.$target.appendChild(this.todoContainer.$el);
  }
}
