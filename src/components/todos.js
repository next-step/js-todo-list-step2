import { fetchAPI, METHOD } from "./constants";

export const getTodolist = (userid) => fetchAPI(`${userid}/items`);

export const addTodo = (userid, contents) => fetchAPI(`${userid}/items`, METHOD.POST, { contents }); 

export const updateTodo = (userid, itemid, contents) => fetchAPI(`${userid}/items/${itemid}`, METHOD.PUT, { contents });

export const deleteTodo = (userid, itemid) =>  fetchAPI(`${userid}/items/${itemid}`, METHOD.DELETE)

export const toggleTodo = (userid, itemid) => fetchAPI(`${userid}/items/${itemid}/toggle`, METHOD.PUT);

export const setPriorityTodo = (userid, itemid, priority) => fetchAPI(`${userid}/items/${itemid}/priority`, METHOD.PUT, { priority });

export const deleteTodoList = (userid) =>  fetchAPI(`${userid}/items`, METHOD.DELETE);



