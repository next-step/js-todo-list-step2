import {Component} from "./core/Component.js";
import {UserContainer} from "./containers/UserContainer.js";
import {TodoContainer} from "./containers/TodoContainer.js";
import {FETCH_USERS, userStore} from "./store/userStore.js";

const App = class extends Component{

  async componentInit () {
    await userStore.dispatch(FETCH_USERS);

    this.$children = {
      UserContainer: { constructor: UserContainer },
      TodoContainer: { constructor: TodoContainer },
    }
  }

  template () {
    return `
      <div data-component="UserContainer"></div>
      <section data-component="TodoContainer" class="todoapp"></section>
    `;
  }

}

new App(document.querySelector('#app'));