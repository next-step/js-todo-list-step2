import {$userCreateButton, $userList} from '../todoDOM.js';
import {template} from '../template.js';
import {api} from '../api.js';
import {todo} from './todo.js';
import {editTitleName} from './todoTitle.js';

export const newUser = {
    handler () {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  
        newUser.create(userName);
        userState.set();
    },

    create: async (userName) => {
        const user = {
            name: userName
        };
    
        const response = await api.addUser(user);
        userList.clear();
        userList.load();
    }
}

export const userList = {
    load: async () => {
        const users = await api.loadUserList();
        console.log(users);
    
        users.map((user) => {
            userList.add(user.name, user._id);
        })

        userState.set();
    },

    add (name, userId) {
        $userList.insertAdjacentHTML('afterbegin', template.userButtons(name, userId));
    },

    clear () {
        while($userList.firstChild !== $userCreateButton){
            $userList.firstChild.remove();
        }
    },
    
}

//아직 미완성
export const userEdit = {

    remove: async () => {
        const target = userEdit.findActiveUser();
        const userId = userEdit.getId(target);

        console.log(target);
        console.log(userId);
    },

    removeFromList (target) {
        target.remove();
    },

    getId (target) {
        const userId = target.dataset.userid;
        return userId;
    },

    findActiveUser () {
        return $userList.querySelector('active');
    }
}



export const userState = {
    set () {
        const $firstUser = $userList.querySelector('button');
        const $secondUser = $firstUser.nextSibling;
        const firstUserName = $firstUser.innerText;
        const firstUserId = userEdit.getId($firstUser);

        userState.addActive($firstUser);
        userState.removeActive($secondUser);
        editTitleName(firstUserName);
        todo.load(firstUserId)
    },

    change ({target}) {
        if(target.classList.item(1) !== 'user-create-button'){
            if(target.classList.item(1) !== 'user-delete-button'){
            
                const targetUserName= target.innerText;
        
                userState.init();
                userState.addActive(target);
            
                editTitleName(targetUserName);
            }
        }
    },

    init () {
        const buttons = $userList.querySelectorAll('.ripple');
        buttons.forEach((button) => {
            userState.removeActive(button);
        });
    },

    addActive (element) {
        element.classList.toggle('active');
    },

    removeActive (element) {
        element.classList.remove('active');
    }

}
