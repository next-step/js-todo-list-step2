import Api from "../utils/api.js"
import State from "./state.js";

export const fetchUsers = async () => {
    const users =  await new Api()
        .get("/api/users")
        .build();

    return State.of(users);
}