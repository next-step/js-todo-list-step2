export default new class Urls{
    constructor(){
        this.baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users/';;
    }
    user = (user_id) => (this.baseUrl+user_id)
    userItems = (user_id) => (this.user(user_id)+"/items/")
    userItem = (user_id,item_id)=> (this.userItems(user_id)+item_id)
    userItemToggle = (user_id,item_id) => (this.userItem(user_id,item_id)+"/toggle")
    userItemPriority = (user_id,item_id) => (this.userItem(user_id,item_id)+"/priority")
}