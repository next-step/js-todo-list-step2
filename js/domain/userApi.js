import Api from "../utils/api.js"

export const fetchUsers = async () => {
    return await new Api()
        .get("/api/users")
        .build();
}