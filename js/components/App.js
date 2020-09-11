import User from "../domain/user.js";
import { fetchUser, fetchUsers } from "../domain/userApi.js";
import Api from "../utils/api.js";
import { SELECTOR } from "../utils/constant.js";
import { checkTarget } from "../utils/validator.js";
import UserList from "./UserList.js";

function App($target) {

    const init = async () => {
        checkTarget($target)
        this.$target = $target;
        this.state = await fetchUsers(),
        
        this.userList = new UserList({
            $target: document.querySelector(SELECTOR.USER_LIST),
            state: this.state,
            onChangeUser : this.onChangeUser,
        })
    }

    this.onChangeUser = async (username) => {
        const user = await fetchUser(username)
        this.state.setActiveUser(user)
        this.setState();
    }

    this.setState = () => {
        this.userList.setState(this.state)
    }

    init();
}

export default App;