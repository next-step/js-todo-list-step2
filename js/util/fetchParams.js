import HttpMethod from "./httpMethod.js"
import Urls from "./urls.js"
export default new class fetchParams{
    get userList() { return {url : Urls.baseUrl} }
    user = (user_id) => ({url : Urls.user(user_id)})
    userItem = (user_id) => ({url : Urls.userItems(user_id)})
    deleteUser = (user_id) => ({
        url : Urls.user(user_id),
        option : HttpMethod.DELETE
    })
    deleteItem = (user_id,item_id) => ({
        url : Urls.userItem(user_id,item_id),
        option : HttpMethod.DELETE
    })
    deleteAllItem = (user_id) => ({
        url : Urls.userItems(user_id),
        option : HttpMethod.DELETE
    })
    addUser = (name) => ({
        url : Urls.baseUrl,
        option : HttpMethod.POST(JSON.stringify({ name : name }))
    })
    addItem = (user_id,contents) => ({
        url : Urls.userItems(user_id),
        option : HttpMethod.POST(JSON.stringify({ contents: contents }))
    })
    updateContents = (user_id,item_id,contents) => ({
        url : Urls.userItem(user_id,item_id),
        option : HttpMethod.PUT(JSON.stringify({ contents: contents }))
    })
    updatePriority = (user_id,item_id,priority) => ({
        url : Urls.userItemPriority(user_id,item_id),
        option : HttpMethod.PUT(JSON.stringify({ priority : priority }))
    })
    toggleCompleted = (user_id,item_id) => ({
        url : Urls.userItemToggle(user_id,item_id),
        option : HttpMethod.PUT()
    })
}
