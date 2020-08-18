import UserTitle from "../Components/UserTitle.js";
import UserList from "./UserList.js";
import TodoInput from "./TodoInput.js";
import { DEFAULT_ACTIVE_USER } from "../constants.js";

function App($target) {
  this.$target = $target;
  this.activeUser = DEFAULT_ACTIVE_USER;

  this.setActiveUser = (newActiveUser) => {
    this.userList.setState(newActiveUser);
    this.userTitle.setState(newActiveUser);
  };

  this.render = () => {
    this.$target.innerHTML = `
       <h1 id="user-title"></h1>
       <section>
        <div id="user-list">
        </div>
       </section>
       <section class="input-container"></section>
    `;
  };

  this.render();
  this.userTitle = new UserTitle(
    document.querySelector("#user-title"),
    this.activeUser
  );
  this.userList = new UserList(
    document.querySelector("#user-list"),
    this.activeUser,
    { setActiveUser: (newActiveUser) => this.setActiveUser(newActiveUser) }
  );
  this.todoInput = new TodoInput(document.querySelector(".input-container"));
}

export default App;
