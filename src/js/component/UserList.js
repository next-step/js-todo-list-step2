import Observer from "../core/observer.js";
import { $ } from "../util/util.js"
import { userAPI, todoAPI } from "../api/api.js";

export class UserList extends Observer{
    constructor(userState, selectedUserState){
        super();
        this.userState = userState;
        this.selectedUserState = selectedUserState;
    }
    template(){
        const userlist = this.userState.get();
        const selectedUser = this.selectedUserState.get();

        return `
        ${userlist.map(item => `
         <button class="ripple ${item._id ===selectedUser._id ? "active":""}">${item.name}</button>
         `).join('')}
         <button class="ripple user-create-button" data-action="createUser">
         + 유저 생성
        </button>
        <button class="ripple user-delete-button" data-action="deleteUser">
            삭제 -
        </button>
        `
    }
    render(){
        const target = $("#user-list");
        target.innerHTML = this.template();
        this.mounted();
    }
    mounted(){
        const createUserBtn = $('.user-create-button');
        //conasole.log(createUserBtn);
        createUserBtn.addEventListener('click', this.onCreateUser);
        const deleteuserBtn = $('user-delete-button');
    }
    update(){
        this.render();
    }
    onCreateUser(){
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
        console.log(userName);
        userAPI.addUser(userName).then(
            data => console.log(data)
        )
        

    //     const initData = userAPI.getAllUser().then(
    //         data => {
    //            this.userState.set(data);
    //            this.selectedUserState.set(data[0]);
    //            console.log(data[0])
    //            this.todoState.set(data[0].todoList);
               
    //         }
    //    )

    }
}