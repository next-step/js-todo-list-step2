import Api from "../utils/api.js";

export const addTodo = async (contents, userId) => {
    return await new Api()
        .post(`/users/${userId}/items/`)
        .data({ contents })
        .build();
};
