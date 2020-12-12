import { getUserList, getUser, addUser } from '../api/todoAPI.js';

export default function UserList($element, {setUserInfo} ) {
    this.users = [];
    this.activeUser = {}
    this.initialIdForTest = 'woSRmp5oh';

    this.getUserList = async () => {
        try{
            this.users = await getUserList();
        }catch(err){
            console.log("err", err);
        }

        setUserInfo(this.activeUser)

        console.log(this.users, this.activeUser);
    }

    this.getUserInfo = async () => {
        try{
            this.activeUser = await getUser(this.initialIdForTest);
        }catch(err){
            console.log("err", err);
        }
    }

    this.addUser = async (username) => {
        try{
            const response = await addUser(username);
            this.activeUser = response;
            this.getUserList();
        }catch(err){
            console.log("err", err);
        }
    }

    this.bindEvents = () => {

        const onUsernameSet = ({target}) => {
            if(target.classList.contains('ripple') && target.nodeName === 'BUTTON'){
                const userId = target.dataset.id; 
                this.activeUser = this.users.find(user => user._id === userId);
                setUserInfo(this.activeUser);
            }
        }

        const onAddUser = ({target}) => {
            if(target.classList.contains('user-create-button') && target.nodeName === 'BUTTON'){
                let username = prompt("당신의 이름은?");
                if(username.trim() && username.length >= 2){
                    this.addUser(username);
                }
            }
        }

        $element.addEventListener("click", onUsernameSet);
        $element.addEventListener("click", onAddUser);
    }

    this.init = () => {
        this.getUserInfo();
        this.getUserList();
        this.bindEvents();
    }

    this.init();

    const UserComponent = ( user, activeUserId ) => `
        <button class="ripple ${user._id === activeUserId && 'active'}" data-id="${user._id}">
        ${user.name}</button>
    `
    const UserAddComponent = () => `
        <button class="ripple user-create-button">+ 유저 생성</button>
    `

    this.render = () => {
        const template = (this.users.map(user => UserComponent(user, this.activeUser._id))).join("");
        $element.innerHTML = template + UserAddComponent();
    }

}