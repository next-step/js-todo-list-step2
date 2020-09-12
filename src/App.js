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

  render () {
    return `
      <div data-component="UserContainer"></div>
      <section data-component="UserContainer" class="todoapp"></section>
    `;
  }

}

new App(document.querySelector('#app'));