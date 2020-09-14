import {UserTitle} from './components/user/Usertitle.js'
import {UserList} from './components/user/UserList.js'
import {UserAdd} from './components/user/UserAdd.js'
import {TodoList} from './components/todo/TodoList.js'
import {TodoCount} from './components/todo/TodoCount.js'
import {TodoInput} from './components/todo/TodoInput.js'
import {userApi} from "./service/UserApi.js";

const $todoList = document.querySelector('.todo-list');
const $todoInput = document.querySelector('.new-todo');
const $todoCounter = document.querySelector('.count-container');
const $userList = document.querySelector('#user-list');
const $userTitle = document.querySelector('#user-title');
const $userAdd = document.querySelector('.user-register');

class App {
    constructor({
                    $todoList,
                    $todoInput,
                    $todoCounter,
                    $userList,
                    $userTitle,
                    $userAdd,
                    username,
                    userArray,
                }) {
        this.$todoInput = $todoInput;
        this.$todoList = $todoList;
        this.$todoCounter = $todoCounter;
        this.$userTitle = $userTitle;
        this.$userList = $userList;
        this.$userAdd = $userAdd;
        this.username = username;
        this.userArray = userArray;


        this.todoList = new TodoList({
            username,
            $todoList,
            onToggleHandler,
            onRemoveHandler,
        })
        this.userTitle = new UserTitle()
        const userCreateButton = document.querySelector('.user-create-button')
        userCreateButton.addEventListener('click', onUserCreateHandler)


    }


    setState(selectedUsername) {
        this.username = selectedUsername;
        this.userList.setState(this.username);
        this.todoList.setState(this.username);
        this.todoCount.setState(this.username);

    }
}

const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}
const onToggleHandler = (id) => {

    userApi.putUserTodoItemCompleteToggle(this.username, id);
    this.setState(this.username);
}
const onRemoveHandler = (id) => {
    userApi.deleteUserOneTodoItem(this.username , id);
    this.setState(this.username);
}
const onEditHandler = (id, contents) => {
    userApi.putUserTodoItem(id ,contents );
    this.setState(this.username);
}

const username = '';
const userArrayResponse = userApi.getUserList();
const userArray = userArrayResponse.then(response => response);

new App({
    $todoList,
    $todoInput,
    $todoCounter,
    $userList,
    $userTitle,
    $userAdd,
    username,
    userArray
})

