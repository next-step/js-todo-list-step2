const base_url = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const option = {
    post: (contents) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents),
    }),
    
    put: (contents) => ({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents),
    }),

    delete: () => ({
        method: 'DELETE',
    }),

};

const request = async (url, option = {}) => {
    try{
        const response = await fetch(`${base_url}${url}`, option);
        if(!response.ok){
            throw new Error(response.status);
        }
        return await response.json();
    } catch(err){
        alert(`Error: ${err}`);
    }
};

export const API = {
    addUser: (userName) => {
        const content = {
            name: userName,
        };
        return request('/api/users', option.post(content));
    },
    getUsers: () => {
        return request('/api/users');
    },
    deleteUser: (userId) => {
        return request(`/api/users/${userId}`, option.delete());
    },
    getUserTodos: (userId) => {
        return request(`/api/users/${userId}`);
    },
    addTodo: (userId, contents) => {
        const content = {
            contents
        };
        return request(`/api/users/${userId}/items`, option.post(content));
    },
    checkTodo: (userId, itemId) => {
        return request(`/api/users/${userId}/items/${itemId}/toggle`, option.put());
    },
    editTodo: (userId, itemId, contents) => {
        const content = {
            contents
        };
        return request(`/api/users/${userId}/items/${itemId}`, option.put(content));
    },

}