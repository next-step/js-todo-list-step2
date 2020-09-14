import { API_BASE_URL } from '../constant/index.js';
import { createFetchOption } from '../util/index.js';
import Component from '../core/Component.js';
import State from '../core/State.js';
import UserList from './UserList.js';
import UserTitle from './UserTitle.js';
import TodoList from './TodoList.js';
import TodoInput from './TodoInput.js';
import TodoCount from './TodoCount.js';

export default class App extends Component {
  activeUser;

  constructor($target, $props, $children) {
    const {
      $userList,
      $userTitle,
      $todoList,
      $todoInput,
      $todoCount,
    } = $children;

    super($target, $props);

    this.activeUser = new State({}, this.render);
    // this.computedTodoList = new ComputedState();

    new UserList($userList, { activeUser: this.activeUser });
    new UserTitle($userTitle, { activeUser: this.activeUser });
    new TodoList($todoList, {
      activeUser: this.activeUser,
      completeTodo: this.completeTodo,
      deleteTodo: this.deleteTodo,
    });
    new TodoInput($todoInput, {
      activeUser: this.activeUser,
      addTodo: this.addTodo,
    });
    new TodoCount($todoCount);
  }

  addTodo = async (contents) => {
    const option = createFetchOption('POST', { contents });
    const data = await fetch(
      `${API_BASE_URL}/api/users/${this.activeUser.value._id}/items/`,
      option
    );
    this.activeUser.value = {
      ...this.activeUser.value,
      todoList: this.activeUser.value.todoList.concat(await data.json()),
    };
  };

  completeTodo = async (targetItemId) => {
    const option = createFetchOption('PUT');
    await fetch(
      `${API_BASE_URL}/api/users/${this.activeUser.value._id}/items/${targetItemId}/toggle`,
      option
    );
    this.activeUser.value = {
      ...this.activeUser.value,
      todoList: this.activeUser.value.todoList.map((todoItem) => {
        if (todoItem._id === targetItemId)
          todoItem.isCompleted = !todoItem.isCompleted;
        return todoItem;
      }),
    };
  };

  deleteTodo = async (targetItemId) => {
    const option = createFetchOption('DELETE');
    await fetch(
      `${API_BASE_URL}/api/users/${this.activeUser.value._id}/items/${targetItemId}`,
      option
    );
    this.activeUser.value = {
      ...this.activeUser.value,
      todoList: this.activeUser.value.todoList.filter(
        (todoItem) => todoItem._id !== targetItemId
      ),
    };
  };
}
