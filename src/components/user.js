import {$userList} from '../todoDOM.js';
import {editTitleName} from './todoTitle.js';
import {api} from '../api.js';
import {insertTodo} from './todoInput.js';
import {clearTodo} from './todoEdit.js';
import {template} from '../template.js';

export const newUser = {
    handler () {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  
        newUser(userName);
        setActive();
    },

    create () {
        const user = {
            _id: newUser.newId(),
            name: userName,
            todolist: []
        }
    
        api.addUser(user);
        loadUser.addToList(user.name);
    },

    newId () {
        return Math.random().toString(36).substr(2,16);
    }
}

export const loadUser = {
    list: async () => {
        const users = await api.loadUserList();
        console.log(users);
    
        users.map((user) => {
            const name = user.name;
            //const userId = user._id;

            //addToUserIdList(userId);
            loadUser.addToList(name);
        })

        userState.set();
        loadUser.todo(users[7]._id);
    },

    addToList(name){
        $userList.insertAdjacentHTML('afterbegin', template.userButtons(name));
    },

    todo: async (userId) => {
        const array = await api.loadTodoList(userId);
        console.log(array);

        let todos = [];
        for(let i in array){
            const newTodo = array[i].contents;
            todos = [...todos, newTodo];
        }

        //console.log(todos);
        clearTodo();
        todos.forEach(todo => {
            insertTodo(todo);
        });
    }
}


export const userState = {
    set () {
        const $firstUser = $userList.querySelector('button');
        const firstUserName = $firstUser.innerText;

        userState.addActive($firstUser);
        editTitleName(firstUserName);
    },

    change ({target}) {
        if(target.classList.item(1) !== 'user-create-button'){
            const targetUserName= target.innerText;
            //const targetIndex = getIndexOfUser(targetUserName);
            //console.log(targetIndex);
        
            userState.init();
            userState.addActive(target);
        
            editTitleName(targetUserName);
            //getUserTodo(userIdList[targetIndex]);
            //console.log(userIdList[targetIndex]);
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
