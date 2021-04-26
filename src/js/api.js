const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const $api = (() => {
    const connectApi = (url, option) => fetch(url, option)
    .then((response) => response.json());
    
    const user = {
        getAll() {
            return connectApi(BASE_URL + '/api/users');
        },

        addUser(newUser) {
            const option = {
                method : 'POST',
                headers : {
                'Content-Type': 'application/json'
                },
                body : JSON.stringify(newUser)
            };
            newUser.body = JSON.stringify(newUser)
            return connectApi(BASE_URL + '/api/users', option);
        },

        deleteUser(_id) {
            const option = {
                method : 'DELETE',
            }
            return connectApi(BASE_URL + '/api/users/' + _id, option);
        },

        loadTodoItem(_id) {
            return connectApi(BASE_URL + '/api/users/' + _id + '/items')
        },

        addTodoItem(_id, todo) {
            const option = {
                method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            }
            return connectApi(BASE_URL + '/api/users/' + _id + '/items', option)
        },

        editTodoItem(_id, itemId, contents) {
            const option = {
                method : 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contents),
            }
            return connectApi(BASE_URL + '/api/users/' + _id + '/items/' + itemId, option)
        }
    }

  
    return {
        user
    };
})();

export default $api