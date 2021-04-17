import { $,$$ } from "../../util/domSelection.js";

export class UserList{
    static ACTIVE = 'active';
    constructor(todoApp){
        this.todoApp = todoApp;
        const list = $("#user-list");
        list.addEventListener("click", function (e) {
            if(e.target && ( e.target.classList.contains("user-create-button") || e.target.classList.contains("user-delete-button"))) {
                return true;
            }
            if (e.target && e.target.nodeName == "BUTTON") {
                const selectedButton = e.target;
                $$("#user-list button").forEach(button => button.classList.remove(UserList.ACTIVE));
                selectedButton.classList.toggle(UserList.ACTIVE);
                todoApp.changeUser(selectedButton.dataset.userid);
            }
        });
        list.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("user-create-button")) {
                const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
                if(userName.trim().length < 2){
                    alert('유저명은 최소 2자 이상 입력해 주세요.');
                    return;
                }
                todoApp.addUser(userName);
            }
        });
        list.addEventListener("click", function (e) {
            if (e.target && e.target.classList.contains("user-delete-button")) {
                const deleteUserName =  todoApp.currentUser.name;
                if(confirm(deleteUserName +"을 삭제하시겠습니까?")){
                    todoApp.deleteUser(todoApp.currentUser._id);
                };
            }
        });
    }

    setState(users,currentUser){
        const list = $("#user-list");
        const title = $("#user-title strong");
        list.innerHTML = "";
        let button;
        users.forEach((item) => {
            button = document.createElement("button");

            const idAttribute = document.createAttribute("data-userid");
            idAttribute.value = item._id;

            button.setAttributeNode(idAttribute);
            const buttonClass = document.createAttribute("class");
            const classList = ['ripple'];
            
            if (item._id == currentUser._id) {
                classList.push('active');
                title.textContent = item.name;
            }
            buttonClass.value = classList.join(' ');
            button.setAttributeNode(buttonClass);

            button.innerHTML = item.name;
            list.appendChild(button);
        });
        list.innerHTML = list.innerHTML + 
        `<button class="ripple user-create-button" data-action="createUser">
        + 유저 생성
        </button>
        <button class="ripple user-delete-button" data-action="deleteUser">
        삭제 -
        </button>`;
    }
}