import { checkArray } from "../utils/validator.js";
import User from "./user.js";

class State {
    constructor(users) {
        checkArray(users);

        this.users = users
    }

    static of(users) {
        const newUser = users.map(user => User.of(user))
        return new State(newUser);
    }
}

export default State;