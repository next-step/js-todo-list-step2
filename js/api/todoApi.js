import Api from "../utils/api.js";

export const addTodo = (contents, userId) => {
    return new Api().post(`/users/${userId}/items/`).data({ contents }).build();
};

export const toggleTodo = (userId, itemId) => {
    return new Api().put(`/users/${userId}/items/${itemId}/toggle`).build();
};

export const removeTodo = (userId, itemId) => {
    return new Api().delete(`/users/${userId}/items/${itemId}`).build();
};
