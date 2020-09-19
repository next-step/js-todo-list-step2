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

export const getTodoList = async (userId) => {
    const data = await fetch(`${BASE_URL}/${userId}/items/`)
    if (!data.ok) {
        throw new Error(data.status);
    }
    return await data.json();
}

export const createUser = async (userName) => {
    const data = await fetch(BASE_URL, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({name: userName})
    })
    return await data.json();
}