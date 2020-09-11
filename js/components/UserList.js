import { userButtonDOM } from "../utils/templates.js";
import { checkTarget } from "../utils/validator.js";

class UserList {
    constructor({$target, users}) {

        checkTarget($target)
        this.$target = $target;
        this.users = users;

        this.render();
    }

    createUserListDOM = () => {
        return this.users.reduce((html, user) => 
            html + userButtonDOM(user)
        ,"")
    }

    render() {
        this.$target.innerHTML = this.createUserListDOM();
    }
}

export default UserList;