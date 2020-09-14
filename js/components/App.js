import { API_BASE_URL } from '../constant/index.js';
import { createFetchOption } from '../util/index.js';
import Component from '../core/Component.js';
import State from '../core/State.js';
import UserList from './UserList.js';
import UserTitle from './UserTitle.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';

export default class App extends Component {
  activeUser;

  constructor($target, $props, $children) {
    const { $userList, $userTitle, $todoList, $todoInput } = $children;

    super($target, $props);

    this.activeUser = new State('', this.render);

    new UserList($userList, { activeUser: this.activeUser });
    new UserTitle($userTitle, { activeUser: this.activeUser });
    new TodoList($todoList, { activeUser: this.activeUser });
    new TodoInput($todoInput, {
      activeUser: this.activeUser,
      addTodo: this.addTodo,
    });
  }

  addTodo = async (activeUser, contents) => {
    const option = createFetchOption('POST', { contents });
    const data = await fetch(
      `${API_BASE_URL}/api/users/${activeUser.value._id}/items/`,
      option
    );
    activeUser.value = {
      ...activeUser.value,
      todoList: activeUser.value.todoList.concat(await data.json()),
    };
  };
}
