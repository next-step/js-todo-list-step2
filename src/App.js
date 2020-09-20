import {Component} from "./core/Component.js";
import {UserContainer} from "./containers/UserContainer.js";
import {TodoContainer} from "./containers/TodoContainer.js";
import {FETCH_USERS, SET_USER, SET_USERS, userStore} from "./store/userStore.js";
import {getQuery} from "./utils/index.js";
import {SET_TODO_ITEMS, todoStore} from "./store/todoStore.js";

const App = class extends Component{

  async componentInit () {
    const users = await userStore.dispatch(FETCH_USERS);
    const userId = getQuery('user_id');
    const selectedIndex = Math.max(users.findIndex(({ _id }) => _id === userId), 0);
    userStore.commit(SET_USERS, users);
    userStore.commit(SET_USER, selectedIndex);
    todoStore.commit(SET_TODO_ITEMS, users[selectedIndex].todoList);
  }

  $children =  () => ({
    UserContainer: { constructor: UserContainer },
    TodoContainer: { constructor: TodoContainer },
  })

  template () {
    return `
      <div data-component="UserContainer"></div>
      <section data-component="TodoContainer" class="todoapp"></section>
    `;
  }

}

new App(document.querySelector('#app'));
