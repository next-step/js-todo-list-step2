const baseURL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

export const API = {
    fetchUserList: () => fetch(baseURL + '/api/users'),
    fetchTodoList: user => fetch(baseURL + `/api/users/${user}/items/`),
    addUser: newUser => fetch(baseURL + '/api/users',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        }   
    ),
    deleteUser: user => fetch(baseURL + `/api/users/${user}`,
        {
            method: 'DELETE',
        }
    ),

    addTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todoItem),
        }   
    ),
    deleteTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/${todoItem}`,
        {
            method: 'DELETE',
        }
    ),
    updateTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/${todoItem}`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todoItem),
        }   
    ),
    toggleTodo: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/${todoItem}/toggle`,
        {
            method: 'PUT',
            // headers: {
            //     "Content-Type": "application/json",
            // },
            // body: JSON.stringify(todoItem),
        }   
    ),
    updatePriority: (user, todoItem) => fetch(baseURL + `/api/users/${user}/items/priority`,
        {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(todoItem),
        }   
    ),
}