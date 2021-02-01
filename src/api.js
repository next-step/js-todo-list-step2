const url = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const option = {
    post: (data) => ({
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }),

    delete: () => ({
        method: 'DELETE'
    }),

    put: (data) => ({
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
};

const request = async (url, option={}) => {
    try {
        const response = await fetch(url, option);

        if(!response.ok) {
            throw new Error(response.status);
        }
        return await response.json();

    } catch (e) {
        console.log(e);
    }
}

export const api = {
    loadUserList(){
        return request(`${url}/api/users`);
    },

    addUser(user){
        return request(`${url}/api/users`, option.post(user));
    },

    getUser(){
        return request(`${url}/api/${userId}`);
    },

    deleteUser(){
        return request(`${url}/api/${userId}`);
    },

    loadTodoList(userId){
        return request(`${url}/api/users/${userId}/items/`);
    },

    addTodo(userId, content){
        return request(`${url}/api/users/${userId}/items/`, option.post(content));
    }

}

