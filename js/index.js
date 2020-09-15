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
        this.filterType = '';
        this.userTitle = new UserTitle(this.$target.$userTitle ,{} ,{ liveUser : this.liveUser});
        this.userList = new UserList(this.$target.$userList , {addUser : this.addUser} , {});
        new TodoClearButton(this.$target.$todoClear , {clearTodo :this.clearTodo} , {});
        this.TodoCount = new TodoCount(this.$target.$todoCounter , {} , {});
        new TodoFilter(this.$target.$todoFilter , {} , {});
        new TodoInput(this.$target.$todoInput , {addTodo : this.addTodo , editTodo : this.editTodo} , {});
        this.TodoList = new TodoList(this.$target.$todoList , {isCompleteTodo : this.isCompleteTodo} , {});


        this.getUserList();
    }
    addTodo = (userId , contents) => {

    }
    editTodo = (userId , contents) =>{

    }
    isCompleteTodo = (userId , todoItemId)=>{

    }
    deleteTodo =(userId , todoItemId) =>{

    }
    clearTodo = (userId) => {

    }
    changeTodoPriority = (id , priorityId) => {

    }
    getTodoList = (userId) => {

    }
    getUserList = async () => {
        const userList = await userApi.getUserList();
        this.setUserList(userList);
        this.setUsername(userList[0].name);
    }
    addUser = async (username) => {
        const isCreated = await userApi.postUser(username);
        console.log(isCreated);
    }
    deleteUser = (userId) => {

    }



    setUsername(username){
        this.userTitle.setUsername(username);
        this.userList.setUsername(username);
    }
    setFilter(filterType){
        this.filterType = filterType;
    }
    setTodoList(todoList){

    }
    setUserList(userList){
        this.userList.setUserList(userList);
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

