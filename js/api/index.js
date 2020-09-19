const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users'

export const getTodoApp = async () => {
    const data = await fetch(BASE_URL);
    if (!data.ok) {
        throw new Error(data.status);
    }
    const todoApp = await data.json();
    return todoApp.reduce((acc, cur) => {
        if (!acc.selectedUserId) {
            acc.selectedUserId = cur._id;
        }
        if (!acc.todoList) {
            acc.todoList = cur.todoList;
        }
        acc.userList.push({_id: cur._id, name: cur.name});
        return acc;
    }, {selectedUserId: null, userList: [], todoList: null});
}