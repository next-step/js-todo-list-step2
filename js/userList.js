import TodoState from "./TodoState.js"
import TodoList from "./todoList.js"
import {fetcher} from "./fetcher.js"
import fetchParams from "./fetchParams.js"
export class UserList{
    constructor(){
        this.$userList = document.querySelector("#user-list");
        this.$title = document.querySelector("#user-title strong");
        this.eventController(this.$userList);
    }

    async loadUserList(){
        const users = await fetcher(fetchParams.userList);
        this.makeUserList(users);
    }

    async loadUser(target){
        if(target.nodeName !== "BUTTON") return;
        const index = target.dataset.index;
        this.selectChange(target);
        TodoState.user = TodoState.users[index]; 

        const items = await fetcher(fetchParams.userItem(TodoState.user._id));
        TodoList.makeList(items);
    }
    
    async addUser(){
        const name = prompt("추가하고 싶은 이름을 입력해주세요.");
        if(!name || name.trim().length < 2) return;
        await fetcher(fetchParams.addUser(name));
        await this.loadUserList();
    }
    async deleteUser(){
        if(confirm(`주의! 정말로 ${TodoState.user.name} 유저를 삭제하시겠습니까!?`)){
            await fetcher(fetchParams.deleteUser(TodoState.user._id))
            await this.loadUserList();
        }
    }

    eventController(userList){
        userList.addEventListener("click", ({target}) =>{
            if(!!target.dataset.index) this.loadUser(target);
        })
        userList.addEventListener("click", ({target}) =>{
            if(!!target.classList.contains("user-delete-button"))
                this.deleteUser()
        })
        userList.addEventListener("click", ({target}) => {
            if(target.classList.contains("user-create-button"))
                this.addUser()
        })
    }

    userTemplate(name,index){
        return `<button data-index="${index}"class="ripple">${name}</button>`
    }

    makeUserList(users){
        TodoState.users = users;
        const template = users.map((user,index) => this.userTemplate(user.name,index));
        this.$userList.innerHTML = "\n"+template.join("\n")+"\n";
        this.$userList.insertAdjacentHTML("beforeend", 
        '<button class="ripple user-create-button">+ 유저 생성</button>'+
        '<button class="ripple user-delete-button">- 유저 삭제</button>');
        this.$title.innerText = users[0].name;
        this.$userList.firstElementChild.classList.add("active");
    }
    selectChange(target){
        const index = target.dataset.index;
        qs(".active",this.$userList).classList.remove("active");
        this.$userList.children[index].classList.add("active");
        this.$title.innerText = target.innerText;
    }
}
