import Component from "../core/Component";
import {$,$$} from "./utils.js"

export default class UserList extends Component{
   
    template() {
        const { Users, currentId } = this.$props;
        
        return `
        ${Users&&Users.map(({_id:userid ,name,todoList})=>`
        <button class="ripple ${currentId===userid? `active`: ``}" data-id=${userid}>${name}</button>`).join('')}
        <button class="ripple user-create-button" data-action="createUser">
          + 유저 생성
        </button>  
        <button class="ripple user-delete-button" data-action="deleteUser">
          삭제 -
        </button>`
    }
    setEvent() {
        const { UserList, _id } = this.$props;
        const { onAddUser, onDeleteUser, onGetUser } = this.$props;
        this.addEvent("click", "[data-id]", ({ target }) => {
            if (target.classList.contains('active')) return;
            target.classList.add('active');
            onGetUser(target.dataset.id);
        });
        this.addEvent("click", "[data-action]", ({ target }) => {
            if (target.dataset.action === 'createUser') {
                const name = prompt("이름을 입력하세요");
                onAddUser(name);
            }
            else if (target.dataset.action === 'deleteUser'){
                onDeleteUser(_id);
            }
            return;
        });
    }
}