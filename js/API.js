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

    addTodo: user => fetch(baseURL + `/api/users/${user}/items/`,
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        }   
    ),
}