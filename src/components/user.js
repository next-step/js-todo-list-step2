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
        userList.list();
    }
}

export const userList = {
    list: async () => {
        const users = await api.loadUserList();
        console.log(users);
    
        users.map((user) => {
            userList.addToList(user.name, user._id);
        })

        userState.set();
    },

    addToList (name, userId) {
        $userList.insertAdjacentHTML('afterbegin', template.userButtons(name, userId));
    },

    getId (target) {
        const userId = target.dataset.userid;
        return userId;
    },

    clear () {
        while($userList.firstChild !== $userCreateButton){
            $userList.firstChild.remove();
        }
    },
    
}



export const userState = {
    set () {
        const $firstUser = $userList.querySelector('button');
        const $secondUser = $firstUser.nextSibling;
        const firstUserName = $firstUser.innerText;
        const firstUserId = userList.getId($firstUser);

        userState.addActive($firstUser);
        userState.removeActive($secondUser);
        editTitleName(firstUserName);
        todo.load(firstUserId)
    },

    change ({target}) {
        if(target.classList.item(1) !== 'user-create-button'){
            const targetUserName= target.innerText;
     
            userState.init();
            userState.addActive(target);
        
            editTitleName(targetUserName);
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
