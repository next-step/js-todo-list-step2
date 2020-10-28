import {Component} from "../../core/Component.js";


export class UserList extends Component {

    template = (userId, userName, userList) => {

        return userList.map(
            (user) =>
                `<button data-id="${user._id}" class="${
                    user._id === userId ? 'ripple active' : 'ripple'
                }">${user.name}</button>`
        ).join(' ');
    }
    loadingTemplate = () => `
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
    createUserTemplate = () => `
    <button class="ripple user-create-button">+ 유저 생성</button>
`
    deleteUserTemplate = () => `
    <button class="ripple user-delete-button">- 유저 삭제</button>
`

    userId;
    userList;
    username;

    constructor($target, event, props) {
        super($target, event, props);
        this.$target.addEventListener('click', e => {
            if (e.target.className === 'ripple user-create-button') {
                const userName = prompt('생성 하고 싶은 이름을 입력해주세요');

                if (userName && userName !== '' && userName.length > 1) {
                    this.event.addUser(userName);
                    return;
                }
            }
            if (e.target.className === 'ripple user-delete-button') {
                const userName = prompt('삭제 하고 싶은 이름을 입력해주세요');
                if (userName && userName !== '' && userName.length > 1) {
                    // this.event.deleteUser(userName);
                    return;
                }
            }
            if (e.target.className === 'ripple') {

                this.event.getTodoList(e.target.innerText, e.target.dataset.id);
            }
        })

    }

    setUserId(userId) {
        this.userId = userId;
        this.render();
    }

    setUsername(username) {
        this.username = username;
        this.render();
    }

    setUserList(userList) {
        this.userList = userList;
        this.render();
    }

    render() {

        let template = '';

        template += this.template(this.userId, this.username, this.userList);
        template += this.createUserTemplate();
        template += this.deleteUserTemplate();
        this.$target.innerHTML = template;


    }
}