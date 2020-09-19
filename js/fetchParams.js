export default new class fetchParams{//ㄷ_ㄷ..
    constructor(){
        this.baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users/';
    }
    get userList() { return {url : this.baseUrl} }
    user = (user_id) => ({url : this.baseUrl+user_id})
    userItem = (user_id) => ({url : this.baseUrl+`${user_id}/items/`})
    deleteUser = (user_id) => ({
        url : this.baseUrl+`${user_id}`,
        option : { method : "DELETE" }
    })
    deleteItem = (user_id,item_id) => ({
        url : this.baseUrl+`${user_id}/items/${item_id}`,
        option : { method : "DELETE" }
    })
    deleteAllItem = (user_id) => ({
        url : this.baseUrl+`${user_id}/items/`,
        option : { method : "DELETE" }
    })
    addUser = (name) => ({
        url : this.baseUrl,
        option : {
            method : "POST",
            headers  : { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name : name })
        }
    })
    addItem = (user_id,contents) => ({
        url : this.baseUrl+`${user_id}/items/`,
        option : {
            method : "POST",
            headers  : { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: contents })
        }
    })
    updateContents = (item_id,contents) => ({
        url : this.baseUrl+`items/${item_id}/`,
        option : {
            method : "PUT",
            headers  : { 'Content-Type': 'application/json' },
            body : JSON.stringify({ contents: contents })
        }
    })
    updatePriority = (user_id,item_id,priority) => ({
        url : this.baseUrl+`${user_id}/items/${item_id}/priority`,
        option : {
            method : "PUT",
            headers  : { 'Content-Type': 'application/json' },
            body : JSON.stringify({ priority : priority })
        }
    })
    toggleCompleted = (user_id,item_id) => ({
        url : this.baseUrl+`${user_id}/items/${item_id}/toggle`,
        option : { method : "PUT" }
    })

}
