import UserContainer from './UserContainer.js';
import TodoContainer from './TodoContainer.js';
import eventChannel, { ACTION } from '../core/eventChannel.js';

export default class App {
  constructor($target) {
    this.$target = $target;

    this.userContainer = new UserContainer();
    this.todoContainer = new TodoContainer();

    this.render();
    this.connect();
  }

  connect() {
    eventChannel.subscribe(ACTION.INIT, ({ detail }) => this.setState(detail));
    eventChannel.publish(ACTION.VIEW_INIT);
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
