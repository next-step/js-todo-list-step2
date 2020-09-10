import TodoService from "./services/TodoService.js";
import { userTemplate } from "./template.js";
import {Component} from "./core/Component.js";
import {UserContainer} from "./containers/UserContainer.js";
import {TodoContainer} from "./containers/TodoContainer.js";

class App extends Component {

  async init () {
    this.$state = {
      selectedIndex: 0,
      users: await TodoService.fetchUsers()
    }
  }

  getUser(){

  }

  render () {
    return `
      <div id="UserContainer"></div>
      <section id="TodoContainer" class="todoapp"></section>
    `;
  }

  componentDidMount () {
    const $userContainer = document.querySelector('#UserContainer');
    const $todoContainer = document.querySelector('#TodoContainer');

    new UserContainer($userContainer, {...this.$state});
    new TodoContainer($todoContainer, {
      selectedUser: this.$state.users[this.$state.selectedIndex]
    });
  }

}

const $app = document.querySelector('#app');
new App($app);