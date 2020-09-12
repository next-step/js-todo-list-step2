import UserTitle from "./UserTitle.js";
import { DEFAULT_USER } from "../constants.js";
import {getUserList} from "../api/users.js";

class App {
	#user
	#userList

  constructor($target) {
    this.$target = $target;
    this.state = { username };
    this.initComponents();
  }

  render() {}

  initComponents() {
	console.log(getUserList());
  }
}

export default App;
