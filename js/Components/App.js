import TodoApp from "./TodoApp.js";
import UserTitle from "./UserTitle.js";
import UserList from "./UserList.js";
import { DEFAULT_USER } from "../constants.js";
import { validateUserName, validateInstance } from "../utils.js";

function App($target) {
  validateInstance(App, this);
  this.activeUser = DEFAULT_USER;

  this.render = () => {
    $target.innerHTML = `
        <h1 id="user-title"></h1>

        <section>
          <div id="user-list"></div>
        </section>

        <main>
            <section id="todoapp" class="todoapp">
            </section>
        </main>
      `;
  };

  this.setActiveUser = (newActiveUser) => {
    validateUserName(newActiveUser);
    this.activeUser = newActiveUser;
    this.userTitle.setState({ activeUser: this.activeUser });
    this.userList.setState({ activeUser: this.activeUser });
    this.todoApp.setState({ activeUser: this.activeUser });
  };

  this.render();

  this.userTitle = new UserTitle(
    document.querySelector("#user-title"),
    this.activeUser
  );
  this.userList = new UserList(
    document.querySelector("#user-list"),
    this.activeUser,
    { onClickUser: (userName) => this.setActiveUser(userName) }
  );
  this.todoApp = new TodoApp(
    document.querySelector("#todoapp"),
    this.activeUser
  );
}

export default App;
