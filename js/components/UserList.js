import { Observer } from "../observer/Observer.js";

export const UserList = class extends Observer {


    setEvent() {
        this._target.addEventListener("click", ({ target }) => {
            if (target.classList.contains("user-create-button")) {
                const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
                if (userName && userName !== ''&& 1 < userName.length) {
                    this._service.addUser(userName);
                }
            }
        });
        this._target.addEventListener("click", ({ target }) => {
            if (!target.classList.contains("user-create-button")) {
                const selectedIdx = target.dataset['idx'];
                this._service.changeSelectedUserById(selectedIdx);
            }
        });
    }

    setState() {
        super.setState({ userList: this._service.getUserList(), selectedUser: this._service.getSelectedUser() });
    }

    template() {
        const { userList, selectedUser } = this._state;
        if (userList.length && userList.length > 0) {
            let tag = userList.map(u => `<button class="ripple ${Object.is(u,selectedUser) ? 'active' : ''}" data-idx="${u._id}">${u.name}</button>`
            ).join("")
            tag += `<button class="ripple user-create-button">+ 유저 생성</button>`;
            return tag;
        }
        return '';
    }
}
