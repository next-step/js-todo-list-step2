import {Component} from "../core/Component.js";
import {store} from "../modules/index.js";
import {fetchGetUser, fetchAddUser} from "../modules/user/actions.js";

function UserListItem(user, isActive) {
    return `
        <button 
            class="ripple  ${isActive ? " active" : ""}"
            data-action="select"
            data-user=${user._id}>
            ${user.name}
        </button>
    `
}

export default class UserList extends Component {

    selectUser(userId) {
        store.dispatch(fetchGetUser.REQUEST({ userId }));
    }

    createUser(userName) {
        store.dispatch(fetchAddUser.REQUEST({ userName }))
    }

    setEvent(target) {
        target.addEventListener("click", ({target}) => {
            const action = target.dataset.action;
            switch (action) {
                case "select":
                    const userId = target.dataset.user;
                    this.selectUser(userId);
                    break;
                case "create":
                    const userName = prompt("추가하고 싶은 이름을 입력해주세요");
                    if(userName.length < 2) {
                        alert("사용자 이름은 2글자 이상이어야 합니다.");
                    }else {
                        this.createUser(userName);
                    }
                    break;
                default:
                    break;
            }
            event.stopImmediatePropagation();
        });
    }

    render() {
        const {users, selectedUser} = store.getState();

        return `
            <div id="user-list">
                ${users && users.map((user) => UserListItem(user, user._id === selectedUser._id))}
                <button 
                    class="ripple user-create-button"
                    data-action="create">+ 유저 생성</button>
            </div>
        `
    }
}
