import { checkArray, checkInstance, checkType } from "../utils/validator.js";
import User from "./user.js";

class State {
    constructor(users, user) {
        checkArray(users);
        checkInstance(user, User)

        this.users = users
        this.user = user
    }

    static of(users) {
        const newUser = users.map(user => User.of(user))
        return new State(newUser, User.init());
    }

    setActiveUser = (user) => {
        this.user = user;
    }
}

export default State;