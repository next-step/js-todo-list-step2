import Api from "../utils/api.js";
import State from "./state.js";
import User from "./user.js";

export const fetchUsers = async () => {
    const users = await new Api().get("/users").build();
    return State.of(users);
};

export const fetchUser = async (name) => {
    const user = await new Api().get(`/users/${name}`).build();

    return User.of(user);
};

export const addUser = async (name) => {
    const user = await new Api().post("/users").data({ name }).build();

    return User.of(user);
};
