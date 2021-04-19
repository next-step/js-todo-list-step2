const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const $api = (() => {
    const connectApi = (url, option) => fetch(url, option)
    .then((response) => response.json());
    
    const user = {
        getAll() {
            return connectApi(BASE_URL + '/api/users');
        },

        addUsers(newUser) {
            const option = {
                method : 'POST',
                headers : {
                'Content-Type': 'application/json'
                },
                body : JSON.stringify(newUser)
            };
            newUser.body = JSON.stringify(newUser)
            return connectApi(BASE_URL + '/api/users', option);
        }
    }

  
    return {
        user
    };
})();

export default $api