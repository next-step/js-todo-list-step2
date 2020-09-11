import User from "../domain/user.js";
import { fetchUsers } from "../domain/userApi.js";
import Api from "../utils/api.js";
import { SELECTOR } from "../utils/constant.js";
import { checkTarget } from "../utils/validator.js";
import UserList from "./UserList.js";

function App($target) {

    const init = async () => {
        checkTarget($target)
        this.$target = $target;
        this.state = {
            users : await fetchUsers(),
        }
    
        this.userList = new UserList({
            $target: document.querySelector(SELECTOR.USER_LIST),
            users: this.state.users
        })
    }

    init();
}

export default App;