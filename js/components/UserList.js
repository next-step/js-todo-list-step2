import { CLASS, EVENT, SELECTOR } from "../utils/constant.js";
import { userButtonDOM, userCreateButtonDOM } from "../utils/templates.js";
import { checkTarget } from "../utils/validator.js";

class UserList {
    constructor({$target, users}) {

        checkTarget($target)
        this.$target = $target;
        this.users = users;

        this.bindEvents()
        this.render();
    }

    bindEvents = () => {
        this.$target.addEventListener(EVENT.CLICK, this.onClick);
    }

    onClick = (e) => {
        if(!e.target.className.includes(CLASS.USER_CREATE_BUTTON)) return;
        // TODO : API 확인 후 구현 완료
        prompt("사용자 이름을 입력해주세요")
    }

    createUserListDOM = () => {
        return this.users.reduce((html, user) => 
            html + userButtonDOM(user)
        ,"") + userCreateButtonDOM();
    }

    render() {
        this.$target.innerHTML = this.createUserListDOM();
    }
}

export default UserList;