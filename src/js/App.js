import { $, $$ } from "./util/util.js";

import { Title  } from  "./component/Title.js"
import { TodoFilter } from "./component/TodoFilter.js";
import { TodoInput } from "./component/TodoInput.js";
import { UserList } from "./component/UserList.js";
import { TodoList } from "./component/TodoList.js";
import { userAPI, todoAPI } from "./api/api.js";

import UserState from "../store/userState.js";
import TodoState from "../store/todoState.js";
import FilterState from "../store/FilterState.js";
import SelectedUserState from "../store/SelectedUserState.js";
import CountState from "../store/countState.js";

export default class App{
    constructor(){
        this.selectedUserState = new SelectedUserState;
        //console.log(this.selectedUserState);
        this.userState = new UserState;
        this.todoState = new TodoState;
        this.filterState = new FilterState;
        //this.countState = new CountState;
        this.init();
    }
    init(){
        //conponent
        this.title = new Title(this.selectedUserState);
        this.userList = new UserList(this.userState, this.selectedUserState);
        this.todoInput = new TodoInput();
        this.todoList = new TodoList(this.todoState);
        this.todoFilter = new TodoFilter(this.todoState, this.filterState);
        //subscribe
        this.selectedUserState.subscribe(this.title);
        this.selectedUserState.subscribe(this.userList);
        this.selectedUserState.subscribe(this.todoFilter);


        this.userState.subscribe(this.userList);
        this.userState.subscribe(this.todoList);
        this.userState.subscribe(this.todoFilter);

        this.todoState.subscribe(this.todoList);
        this.todoState.subscribe(this.todoFilter);
    
        this.filterState.subscribe(this.todoList);
        this.filterState.subscribe(this.todoFilter);

        //this.countState.subscribe(this.todoFilter);
        //초기데이터
        const initData = userAPI.getAllUser().then(
             data => {
                this.userState.set(data);
                this.selectedUserState.set(data[0]);
                console.log(data[0])
                this.todoState.set(data[0].todoList);
                
             }
        )

    }

}