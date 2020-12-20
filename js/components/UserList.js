import { getUserList, getUser, addUser, deleteUser } from '../api/todoAPI.js';

export default function UserList($userList, $userBin, {setUserInfo} ) {
    this.state = { 
        users : [],
    }
    this.activeUser = {};
    this.$draggingElement = null;

    this.setState = ({ users }) => {
        if(users){
            this.state.users = users ?? [];
        }
        this.render();
    }

    this.getUserList = async () => {
        try{
            this.state.users = await getUserList() ?? [];
        }catch(err){
            console.log("err", err);
        }

        if(this.state.users.length > 0){
            this.activeUser = this.state.users[0];
            setUserInfo(this.activeUser);
        }
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

    this.deleteUser = async (userId) => {
        try{
            const response = await deleteUser(userId);
            if(response.message){ // which means delete success
                this.getUserList();
            }
        }catch(err){
            console.log("err",err);
        }
    }

    this.bindEvents = () => {

        const onUsernameSet = ({target}) => {
            if(target.classList.contains('ripple') && target.nodeName === 'BUTTON'){
                const userId = target.dataset.id; 
                this.activeUser = this.state.users.find(user => user._id === userId);
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


        $userList.addEventListener("click", onUsernameSet);
        $userList .addEventListener("click", onAddUser);
    }


    this.bindDragEvents = () => {

        const handleDragStart = (e) => {
            this.$draggingElement = e.target;
            e.dataTransfer.effectAllowed = 'move';
            return;
        }
    
        const handleDragOver = (e) => {
            if(e.target.nodeName === 'IMG' && e.target.classList.contains('bin')){
                if (e.preventDefault) {
                e.preventDefault();
                }
                e.dataTransfer.dropEffect = 'move';
            }
            return;
        }
    
        const handleDragEnter = ({target}) => {
            if(target.nodeName === 'IMG' && target.classList.contains('bin')){
                target.classList.add('over');
            }
            return;
        }
        
        const handleDragLeave = ({target}) => {
            if(target.nodeName === 'IMG' && target.classList.contains('bin')){
                target.classList.remove('over');
            }
            return;
        }
    
        const handleDrop = (e) => {
            if (e.stopPropagation) {
            e.stopPropagation();
            }

            if(e.target.nodeName === 'IMG' && e.target.classList.contains('over')){
                const userId = this.$draggingElement?.dataset?.id ?? null;
                
                if(!userId){
                    e.target.classList.remove('over');
                    return;
                }

                this.deleteUser(userId);
                e.target.classList.remove('over');
                
            }

            return;
        }
    
        const handleDragEnd = (e) => {
            this.$draggingElement = null;
            e.dataTransfer.effectAllowed = 'uninitialized';
        }
        
        $userList.addEventListener('dragstart', handleDragStart, false);
        $userList.addEventListener('dragend', handleDragEnd, false);
        $userBin.addEventListener('dragenter', handleDragEnter, false);
        $userBin.addEventListener('dragover', handleDragOver, false);
        $userBin.addEventListener('dragleave', handleDragLeave, false);
        $userBin.addEventListener('drop', handleDrop, false);

    }

    this.init = () => {
        this.getUserInfo();
        this.getUserList();
        this.bindEvents();
        this.bindDragEvents();
    }

    this.init();

    const UserComponent = ( user, activeUserId ) => `
        <button class="ripple draggable ${user._id === activeUserId && 'active'}" data-id="${user._id}" draggable="true">
        ${user.name}</button>
    `
    const UserAddComponent = () => `
        <button class="ripple user-create-button">+ 유저 생성</button>
    `

    this.render = () => {
        const template = (this.state.users.map(user => UserComponent(user, this.activeUser._id))).join("");
        $userList.innerHTML = template + UserAddComponent();
    }

}