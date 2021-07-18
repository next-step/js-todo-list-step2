import subject from "../js/core/Subject.js";

export default class UserState extends subject {
    constructor(){
        super();
        this.userList = {};
    }
    get(){
        return this.userList;
    } 
    set(updateUser){
        this.userList = updateUser;
        this.publish();
    }
}