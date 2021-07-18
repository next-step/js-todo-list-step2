import subject from "../js/core/Subject.js";

export default class SelectedUserState extends subject {
    constructor(){
        super();
        this.selectedUser = {};
    }
    get(){
        return this.selectedUser;
    } 
    set(updateId){
        this.selectedUser = updateId;
        this.publish();
    }
}