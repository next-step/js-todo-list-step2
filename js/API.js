const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const option = {
    post: target => ({
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(target),
    }),   
    put: target => ({
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(target),
    })
}

export const API = {
    fetchUserList: () => fetch(baseURL + '/api/users'),
    fetchTodoList: user => fetch(baseURL + `/api/users/${user}/items/`),
    addUser: newUser => fetch(baseURL + '/api/users', option.post(newUser)),
    deleteUser: user => fetch(baseURL + `/api/users/${user}`, { method: 'DELETE', }),
    addTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items`, option.post(todoItem)),
    deleteTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/${todoItem}`, { method: 'DELETE', }),
    updateTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/${todoItem._id}`, option.put(todoItem)),
    toggleTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/${todoItem}/toggle`, { method: 'PUT', }),
    updatePriority: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/${todoItem._id}/priority`, option.put(todoItem)),
}