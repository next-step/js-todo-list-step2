import {TodoClearButton} from "./components/todo/TodoClearButton.js";
import {TodoCount} from "./components/todo/TodoCount.js";
import {TodoFilter} from "./components/todo/TodoFilter.js";
import {TodoInput} from "./components/todo/TodoInput.js";
import {TodoList} from "./components/todo/TodoList.js";
import {UserList} from "./components/user/UserList.js";
import {UserTitle} from "./components/user/UserTitle.js";
import {userApi} from "./service/UserApi.js";

const $userList = document.querySelector('#user-list');
const $userTitle = document.querySelector('#user-title');
const $todoList = document.querySelector('.todo-list');
const $todoInput = document.querySelector('.new-todo');
const $todoCounter = document.querySelector('.todo-count');
const $todoFilter = document.querySelector('.filters');
const $todoClear = document.querySelector('.clear-completed');
class App{

    $target ;
    constructor($target = {} ) {
        this.$target = $target;

        this.liveUser = 'test' ;
        this.userList = '';
        this.filterType = '';

        this.userTitle = new UserTitle(this.$target.$userTitle ,{addUser:this.addUser} ,{ liveUser : this.liveUser});
        this.userList = new UserList(this.$target.$userList , {} , {});
        new TodoClearButton(this.$target.$todoClear , {clearTodo :this.clearTodo} , {});
        this.TodoCount = new TodoCount(this.$target.$todoCounter , {} , {});
        new TodoFilter(this.$target.$todoFilter , {} , {});
        new TodoInput(this.$target.$todoInput , {} , {});
        this.TodoList = new TodoList(this.$target.$todoList , {} , {});


    }
    addTodo = (contents) => {

    }
    editTodo = (id , contents) =>{

    }
    completeTodo = (id)=>{

    }
    deleteTodo =(id) =>{

    }
    clearTodo = () => {

    }
    changeTodoPriority = (id , priorityId) => {

    }
    getTodoList = () => {

    }
    getUserList = () => {

    }
    addUser = async (username) => {
        if(username.length < 2) return alert('유저 네임은 2자 이상 지어주십시오.');
        const userList = await userApi.getUserList();
        console.log(userList);
        const userNameList = userList.map(userInfo=> name);
        if(userNameList.includes(username)) return alert('이미 등록된 유저입니다.');
        await userApi.postUser(username);
        const newUserList = await userApi.getUserList();
        console.log(newUserList);
    }
    deleteUser = (userId) => {

    }



    setUsername(username){
        this.userTitle.setState();
    }
    setFilter(filterType){
    }

}


new App({
    $todoList,
    $todoInput,
    $todoCounter,
    $todoFilter,
    $todoClear,
    $userList,
    $userTitle,
} , {})

