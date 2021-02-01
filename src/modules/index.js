import { users } from "./user/index.js";
import { createStore } from "../core/redux/index.js";

const store = createStore(users);

export {
    store
}