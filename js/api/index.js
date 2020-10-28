const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users'

export const getTodoApp = async () => {
    const data = await fetch(BASE_URL);
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return res.reduce((acc, cur) => {
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
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}

export const createUser = async (userName) => {
    const data = await fetch(BASE_URL, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({name: userName})
    })
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}
export const deleteUser = async (userId) => {
    const data = await fetch(`${BASE_URL}/${userId}`, {
        method: 'DELETE', headers:{
            'Content-Type': 'application/json'
        }
    })
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}

export const createTodoItem = async (userId, contents) => {
    const data = await fetch(`${BASE_URL}/${userId}/items`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify({contents})
    })
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}
export const toggleTodoItemComplete = async (userId, itemId) => {
    const data = await fetch(`${BASE_URL}/${userId}/items/${itemId}/toggle`, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        }
    })
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}

export const deleteTodoItem = async (userId, itemId) => {
    const data = await fetch(`${BASE_URL}/${userId}/items/${itemId}`, {
        method: 'DELETE', headers: {
            'Content-Type': 'application/json'
        }
    })
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}

export const updateTodoItem = async (userId, itemId, contents) => {
    const data = await fetch(`${BASE_URL}/${userId}/items/${itemId}`, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contents})
    });
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}
export const deleteAllTodoItem = async (userId) =>{
    const data = await fetch(`${BASE_URL}/${userId}/items/`, {
        method: 'DELETE', headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!data.ok) {
        throw new Error(await data.json());
    }
    return await data.json();
}

export const updateTodoItemPriority = async (userId, itemId, priority) => {
    const data = await fetch(`${BASE_URL}/${userId}/items/${itemId}/priority`, {
        method: 'PUT', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({priority})
    });
    const res = await data.json();
    if (!data.ok) {
        throw new Error(res.message);
    }
    return await res;
}