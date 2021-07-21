import Component from "../core/Component";
import {$,$$} from "../utils.js"

export default class UserList extends Component{
    template() {
        const { $users } = this.$props;
        
        return `
        ${$users.map(({_id, name, todoList})=>`
        <button class="ripple" data-id=${_id}>${name}</button>`).join('')}
        <button class="ripple user-create-button" data-action="createUser">
          + 유저 생성
        </button>
        <button class="ripple user-delete-button" data-action="deleteUser">
          삭제 -
        </button>`
    }
    setEvent() {
        const { onAddUser, onDeleteUser, onGetUser } = this.$props;
        this.addEvent("click", "[data-id]", ({ target }) => {
            onGetUser(target.dataset.id);
        });
        this.addEvent("click", "[data-action]", ({ target }) => {
            const name = propmt("이름을 입력하세요");
            const userid = target.dataset.id;
            switch (target.dataset.action) {
                case "createUser": onAddUser(name);
                    break;
                case "deleteUser": onDeleteUser(userid);
                    break;
                default:
                    break;
            }
        });
    }
}