import {TodoCount} from "./components/todo/TodoCount.js";
import {TodoInput} from "./components/todo/TodoInput.js";
import {TodoList} from "./components/todo/TodoList.js";
import {UserList} from "./components/user/UserList.js";
import {UserTitle} from "./components/user/UserTitle.js";
import {userApi} from "./service/UserApi.js";
import {filterConstant} from "./constants/constants.js";

const $userList = document.querySelector('#user-list');
const $userTitle = document.querySelector('#user-title');
const $todoList = document.querySelector('.todo-list');
const $todoInput = document.querySelector('.new-todo');
const $todoCounter = document.querySelector('.count-container');

class App {

    $target;
    username;
    userId;
    users;
    todoArray;
    todoList;

    constructor($target = {}) {
        this.$target = $target;
        this.username = '';
        this.userId = '';
        this.users = [];
        this.todoArray = [];

        this.filterType = filterConstant.ALL;
        this.userTitle = new UserTitle(this.$target.$userTitle, {}, {});
        this.userList = new UserList(this.$target.$userList, {
            getTodoList: this.getTodoList,
            addUser: this.addUser,
            deleteUser: this.deleteUser
        }, {});
        this.todoCount = new TodoCount(this.$target.$todoCounter, {setFilter: this.setFilter ,clearTodo : this.clearTodo}, {});
        this.todoInput = new TodoInput(this.$target.$todoInput, {addTodo: this.addTodo}, {});
        this.todoList = new TodoList(this.$target.$todoList, {
            isCompleteTodo: this.isCompleteTodo,
            editTodo: this.editTodo,
            deleteTodo: this.deleteTodo,
            changeTodoPriority: this.changeTodoPriority
        }, {});


        this.userLists = this.getUserList();

    }

    addTodo = async (userId, contents) => {
        console.log(userId, contents);
        const isPosted = await userApi.postUserTodoItem(userId, contents);
        const getTodoList = this.getTodoList(this.username, userId);
    }
    editTodo = async (userId, todoItemId, contents) => {
        const isPutted = await userApi.putUserTodoItem(userId, todoItemId, contents);
        const getTodoList = this.getTodoList(this.username, userId);
    }
    isCompleteTodo = async (userId, todoItemId) => {
        const isPutted = await userApi.putUserTodoItemCompleteToggle(userId, todoItemId);
        const getTodoList = this.getTodoList(this.username, userId);
    }
    deleteTodo = async (userId, todoItemId) => {
        const isDeleted = await userApi.deleteUserOneTodoItem(userId, todoItemId);
        const getTodoList = this.getTodoList(this.username, userId);
    }
    clearTodo = async (userId) => {
        const isDeleted = await userApi.deleteUserAllTodoItem(userId);
        const getTodoList = this.getTodoList(this.username, userId);
    }
    changeTodoPriority = async (id, todoId,priority) => {
        const putted = await userApi.putUserTodoItemPriority(id,todoId, priority);
        const todoList = this.getTodoList(this.username, this.userId);
    }

    addUser = async (username) => {

        const userList = await userApi.getUserList();
        userList.forEach(user => {
            if (user.name === username) {
                alert('같은 유저네임이 있습니다.');
                return;
            }
        })

        const isCreated = await userApi.postUser(username);
        const newUserList = this.getUserList();
    }
    deleteUser = async (userId) => {
        const isDeleted = await userApi.deleteUser(userId);
    }
    getTodoList = async (username, userId) => {
        this.setUsername(username);
        this.setUserId(userId);
        const todoList = await userApi.getUserTodoItem(userId);

        this.todoArray = todoList;
        if (this.filterType === 'COMPLETED') {
            this.todoArray = todoList.filter(todo => todo.isCompleted === true);
        }
        if (this.filterType === 'ACTIVE') {
            this.todoArray = todoList.filter(todo => todo.isCompleted === false);
        }
        console.log(this.todoArray);
        this.todoList.setTodoList(this.todoArray);
        this.todoCount.setTodoList(this.todoArray);
    }
    getUserList = async () => {

        const userList = await userApi.getUserList();
        console.log(userList);
        this.setUserList(userList);
        this.users = userList;
    }

    setUsername(username) {
        this.userTitle.setUsername(username);
        this.userList.setUsername(username);
    }

    setUserId(userId) {
        this.userId = userId;
        this.todoInput.setUserId(userId);
        this.todoList.setUserId(userId);
        this.todoCount.setUserId(userId);
        this.userList.setUserId(userId);
    }

    setFilter  = (filterType ) => {

        this.filterType = filterType;
        const todo = this.getTodoList(this.username , this.userId);
    }

    setUserList(userList) {
        this.userList.setUserList(userList);
    }

}


new App({
    $todoList,
    $todoInput,
    $todoCounter,
    $userList,
    $userTitle,
}, {})

