export default new class TodoState{
    constructor(){
        this.users = [];
        this.user = {};
        this.view = "all";
    }

    get userId(){
        return this.user._id;
    }
    itemId(id){
        return this.user.todoList[id]._id;
    }
}
