import UserTitle from "../Components/UserTitle.js";
import UserList from "./UserList.js";
import { DEFAULT_ACTIVE_USER } from "../constants.js";

function App($target) {
  this.$target = $target;
  this.activeUser = DEFAULT_ACTIVE_USER;

  this.setActiveUser = (newActiveUser) => {
    this.userList.setState(newActiveUser);
  };

  this.render = () => {
    this.$target.innerHTML = `
       <h1 id="user-title"></h1>
       <section>
        <div id="user-list">
        </div>
       </section>
    `;
  };

  this.render();
  this.userTitle = new UserTitle(document.querySelector("#user-title"));
  this.userList = new UserList(
    document.querySelector("#user-list"),
    this.activeUser,
    { setActiveUser: (newActiveUser) => this.setActiveUser(newActiveUser) }
  );
}

export default App;
