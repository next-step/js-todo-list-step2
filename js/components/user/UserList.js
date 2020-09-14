import {userApi} from "../../service/UserApi.js";


const template = (userName, userList) => {

    userList.map(
        (user) =>
            `<button class="${
                user.name === userName ? 'ripple active' : 'ripple'
            }">${user.name}</button>`
    ).join('');
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
    <button class="user-create-button">유저 생성</button>
`
const deleteUserTemplate = () => `
    <button class="user-delete-button">유저 삭제</button>
`

export class UserList {
    constructor({
                    $userList,
                    username,
                    userList,
                    onClickUserHandler,
                    onClickUserAddHandler,
                    onClickUSerDeleteHandler
                }) {

        this.$userList = $userList;
        this.username = username;
        this.userList = userList;
        this.$userList.addEventListener('click', (e) => {
            if (e.target.className === 'ripple') {
                onClickUserHandler(e.target.textContent);
            }
        })
        this.render();
    }

    setState(userName) {
        this.username = userName;
        this.render();
    }

    render() {
        this.$userList.innerHTML = loadingTemplate();
        try {
            this.userArray = userApi.getUserList();
            if (this.userArray.length === 0) {
                this.$userList.innerHTML = '유저를 등록하셔야 합니다.';
                return;
            } else {
                this.$userList.innerHTML = template(this.username, this.userList);

            }
            this.$userList.innerHTML += createUserTemplate();
            this.$userList.innerHTML += deleteUserTemplate();
        } catch (error) {

        }
    }
}