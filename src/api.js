export const url = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

export const option = {
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

export const request = async (url, option={}) => {
    try {
        const response = await fetch(`${url}`, option);

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

    addUser(newUser){
        return request(`${url}/api/users`, option.post(newUser));
    }

}

