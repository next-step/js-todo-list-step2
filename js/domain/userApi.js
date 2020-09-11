import Api from "../utils/api.js"
import State from "./state.js";
import User from "./user.js";

export const fetchUsers = async () => {
    const users =  await new Api()
        .get("/api/users")
        .build();

    return State.of(users);
}

export const fetchUser = async (name) => {
    const user = await new Api()
        .get(`/api/users/${name}`)
        .build();

    return User.of(user);
}