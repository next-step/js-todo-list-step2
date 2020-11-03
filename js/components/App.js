import UserContainer from './UserContainer.js';
import TodoContainer from './TodoContainer.js';
import eventChannel from '../core/eventChannel.js';
import { VIEW, STORE } from '../actions/index.js';

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
    when(STORE.UPDATE, (props) => this.setState(props));
    when(STORE.REQUEST, () => this.setLoading());
    done(VIEW.INIT);
  }

  setLoading() {
    this.userContainer.setLoading();
    this.todoContainer.setLoading();
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
