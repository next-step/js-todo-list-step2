import { CLASS, EVENT, SELECTOR } from "../utils/constant.js";
import { userButtonDOM, userCreateButtonDOM } from "../utils/templates.js";
import { checkFunction, checkTarget } from "../utils/validator.js";

class UserList {
    constructor({
        $target, 
        state, 
        onChangeUser, 
        onAddUser
    }) {
        checkTarget($target)
        checkFunction(onChangeUser);
        checkFunction(onAddUser);
        
        this.$target = $target;
        this.state = state;
        this.onChangeUser = onChangeUser;
        this.onAddUser = onAddUser;

        this.bindEvents()
        this.render();
    }

    bindEvents = () => {
        this.$target.addEventListener(EVENT.CLICK, this.onClick);
    }

    onClick = (e) => {
        if(this.isUserButton(e)) {
            const selectedName = e.target.innerText;
            this.onChangeUser(selectedName);
        }
        if(this.isUserCreateButton(e)) {
            // TODO : API 확인 후 구현 완료
            const username = prompt("사용자 이름을 입력해주세요")
            this.onAddUser(username)
        }
    }

    isUserCreateButton = (e) => {
        return e.target.className.includes(CLASS.USER_CREATE_BUTTON)
    }

    isUserButton = (e) => {
        return e.target.className.trim() == CLASS.RIPPLE
    }

    createUserListDOM = () => {
        return this.state.users.reduce((html, user) => 
            html + userButtonDOM(user.name, this.state.user)
        ,"") + userCreateButtonDOM();
    }

    setState = (newState) => {
        this.state = newState;
        this.render();
    }

    render() {
        this.$target.innerHTML = this.createUserListDOM();
    }
}

export default UserList;