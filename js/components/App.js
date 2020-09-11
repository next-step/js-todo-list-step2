import { addUser, fetchUser, fetchUsers } from "../domain/userApi.js";
import { SELECTOR } from "../utils/constant.js";
import { checkTarget } from "../utils/validator.js";
import TodoList from "./TodoList.js";
import UserList from "./UserList.js";

function App($target) {
    const init = async () => {
        checkTarget($target);

        this.$target = $target;
        this.state = await fetchUsers();

        this.userList = new UserList({
            $target: document.querySelector(SELECTOR.USER_LIST),
            state: this.state,
            onChangeUser: this.onChangeUser,
            onAddUser: this.onAddUser,
        });

        this.todoList = new TodoList({
            $target: document.querySelector(SELECTOR.TODO_LIST),
            todos: this.state.user.todoList,
        });
    };

    this.onChangeUser = async (username) => {
        const user = await fetchUser(username);
        this.state.setActiveUser(user);
        this.setState();
    };

    this.onAddUser = async (username) => {
        const newUser = await addUser(username);
        this.state.addUser(newUser);
        this.setState();
    };

    this.setState = () => {
        this.userList.setState(this.state);
        this.todoList.setState(this.state.user.todoList);
    };

    init();
}

export default App;
