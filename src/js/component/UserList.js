import Observer from "../core/observer.js";
import { $, $$ } from "../util/util.js"
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
         <button id="${item._id}" class="ripple user-button ${item._id ===selectedUser._id ? "active":""}">${item.name}</button>
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
        createUserBtn.addEventListener('click', this.onCreateUser.bind(this));
        const deleteuserBtn = $('.user-delete-button');
        deleteuserBtn.addEventListener('click', this.onDeleteUser.bind(this));
        
        const userBtns= $$('.user-button');
        userBtns.forEach(element => {
            element.addEventListener('click', this.onFocusUser.bind(this));
        });
    }
    update(){
        this.render();
    }
    async onFocusUser(e){
        const userId = e.target.id;
        const data = await userAPI.getUser(userId);
        this.selectedUserState.set(data);
    }

    async onCreateUser(){
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
        if(userName.length<2) {
            alert("이름의 길이는 최소2글자이상입니다.");
            return;
        }
        const data = await userAPI.addUser({name : userName});
        this.selectedUserState.set(data);
        const userlist = await userAPI.getAllUser();
        this.userState.set(userlist);
    }
    async onDeleteUser(){
        const selectedID = this.selectedUserState.get()._id;
        await userAPI.deleteUser(selectedID);
        const userlist = await userAPI.getAllUser();
        this.userState.set(userlist);
        this.selectedUserState.set(userlist[0]);
    }
} 