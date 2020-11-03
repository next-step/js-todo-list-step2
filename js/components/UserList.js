import { fetchUsers } from "../api/userApi.js";
import { LOAD_USERS } from "../store/Store.js";
import { CLASS, EVENT, MESSAGE } from "../utils/constant.js";
import { userButtonDOM, userCreateButtonDOM } from "../utils/templates.js";
import { checkFunction, checkTarget } from "../utils/validator.js";

function UserList({ $target, onChangeUser, onAddUser, store }) {
    this.init = async () => {
        checkTarget($target);
        checkFunction(onChangeUser);
        checkFunction(onAddUser);

        store.subscribe(this.render);
        store.dispatch({
            type: LOAD_USERS,
            payload: await fetchUsers(),
        });

        this.bindEvents();
    };

    this.bindEvents = () => {
        $target.addEventListener(EVENT.CLICK, this.onClick);
    };

    this.onClick = (e) => {
        this.onSelectUser(e);
        this.onCreateUser(e);
    };

    this.onSelectUser = (e) => {
        if (isUserButton(e)) {
            const selectedName = e.target.innerText;
            onChangeUser(selectedName);
        }
    };

    this.onCreateUser = (e) => {
        if (isUserCreateButton(e)) {
            const username = prompt(MESSAGE.INPUT_USERNAME);
            if (!username) return;
            if (!isValidUsername(username)) {
                throw new Error(MESSAGE.INVALID_USERNAME);
            }
            onAddUser(username);
        }
    };

    this.render = (state) => {
        const { user, users } = state;
        $target.innerHTML = createUserListDOM(users, user);
    };

    const isUserCreateButton = (e) => {
        // TODO : classList로 변경
        return e.target.className.split(" ").includes(CLASS.USER_CREATE_BUTTON);
    };

    const isUserButton = (e) => {
        return e.target.className.split(" ").includes(CLASS.RIPPLE);
    };

    const isValidUsername = (username) => {
        return username.length >= 2;
    };

    const createUserListDOM = (users, activeUser) =>
        users.reduce(
            (html, user) => html + userButtonDOM(user.name, activeUser),
            ""
        ) + userCreateButtonDOM();

    this.init();
}

export default UserList;
