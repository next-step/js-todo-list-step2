import CommonComponent from "./Common.js";
export default class User {
    $users = null;
    userList = null;
    common = null;
    constructor(userList) {
        console.log(userList);
        this.userList = userList;
        this.common = new CommonComponent();
    }

    onUserCreate(userName) {
        
    }
}