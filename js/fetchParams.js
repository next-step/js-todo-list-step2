import HttpMethod from "./httpMethod.js"
export default new class fetchParams{
    constructor(){
        this.baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users/';
    }
    get userList() { return {url : this.baseUrl} }
    user = (user_id) => ({url : this.baseUrl+user_id})
    userItem = (user_id) => ({url : this.baseUrl+`${user_id}/items/`})
    deleteUser = (user_id) => ({
        url : this.baseUrl+`${user_id}`,
        option : HttpMethod.DELETE
    })
    deleteItem = (user_id,item_id) => ({
        url : this.baseUrl+`${user_id}/items/${item_id}`,
        option : HttpMethod.DELETE
    })
    deleteAllItem = (user_id) => ({
        url : this.baseUrl+`${user_id}/items/`,
        option : HttpMethod.DELETE
    })
    addUser = (name) => ({
        url : this.baseUrl,
        option : HttpMethod.POST(JSON.stringify({ name : name }))
    })
    addItem = (user_id,contents) => ({
        url : this.baseUrl+`${user_id}/items/`,
        option : HttpMethod.POST(JSON.stringify({ contents: contents }))
    })
    updateContents = (user_id,item_id,contents) => ({
        url : this.baseUrl+`${user_id}/items/${item_id}`,
        option : HttpMethod.PUT(JSON.stringify({ contents: contents }))
    })
    updatePriority = (user_id,item_id,priority) => ({
        url : this.baseUrl+`${user_id}/items/${item_id}/priority`,
        option : HttpMethod.PUT(JSON.stringify({ priority : priority }))
    })
    toggleCompleted = (user_id,item_id) => ({
        url : this.baseUrl+`${user_id}/items/${item_id}/toggle`,
        option : HttpMethod.PUT()
    })

}
