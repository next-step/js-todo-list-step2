
import {Component} from "../../core/Component.js";


const template = (userId , userName, userList) => {

    return userList.map(
        (user) =>
            `<button data-id="${user._id}" class="${
                user._id === userId ? 'ripple active' : 'ripple'
            }">${user.name}</button>`
    ).join(' ');
}
const loadingTemplate = () => `
    <li>
        <div class="view">
        <label class="label">
        
            <div class="animated-background">
                 <div class="skel-mask-container">
                    <div class="skel-mask"></div>
                 </div>
            </div>
            </label>
        </div>
    </li>    
    `
const createUserTemplate = () => `
    <button class="ripple user-create-button">+ 유저 생성</button>
`
const deleteUserTemplate = () => `
    <button class="ripple user-delete-button">- 유저 삭제</button>
`

export class UserList extends Component{

    userId;
    userList;
    username;
    constructor($target , event ,  props) {
        super($target , event ,  props);
        this.$target.addEventListener('click' , e=>{
            if(e.target.className ==='ripple user-create-button'){
                const userName = prompt('생성 하고 싶은 이름을 입력해주세요');

                if(userName && userName !== '' && userName.length > 1){
                    this.event.addUser(userName);
                    return;
                }
            }
            if(e.target.className === 'ripple user-delete-button'){
                const userName = prompt('삭제 하고 싶은 이름을 입력해주세요');
                if(userName&& userName !== '' && userName.length > 1){
                   // this.event.deleteUser(userName);
                    return;
                }
            }
            if(e.target.className === 'ripple'){

                this.event.getTodoList(e.target.innerText ,e.target.dataset.id);
            }
        })

    }

    setUserId(userId){
        this.userId = userId;
        this.render();
    }
    setUsername(username){
        this.username = username;
        this.render();
    }
    setUserList(userList){
        this.userList = userList;
        this.render();
    }
    render(){

        this.$target.innerHTML = template(this.userId , this.username , this.userList);
        this.$target.innerHTML += createUserTemplate();
        this.$target.innerHTML += deleteUserTemplate();


    }
}