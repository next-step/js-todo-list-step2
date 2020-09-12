import {Component} from "./core/Component.js";
import {UserContainer} from "./containers/UserContainer.js";
import {TodoContainer} from "./containers/TodoContainer.js";

const App = class extends Component{

  componentInit () {
    this.$children = {
      UserContainer: {
        constructor: UserContainer,
      },
      TodoContainer: {
        constructor: TodoContainer,
      }
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