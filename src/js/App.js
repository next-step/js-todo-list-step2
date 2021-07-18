import { $, $$ } from "./util/util.js";

import { Title  } from  "./component/Title.js"
import { TodoFilter } from "./component/TodoFilter.js";
import { TodoInput } from "./component/TodoInput.js";
import { UserList } from "./component/UserList.js";
import { TodoList } from "./component/TodoList.js";
import { userAPI, todoAPI } from "./api/api.js";

import UserState from "../store/userState.js";
import FilterState from "../store/FilterState.js";
import SelectedUserState from "../store/SelectedUserState.js";
import CountState from "../store/countState.js";

export default class App{
    constructor(){
        this.selectedUserState = new SelectedUserState;
        this.userState = new UserState;
        this.filterState = new FilterState;
        this.init();
    }
    async init(){

        
       
        //conponent
        this.title = new Title(this.selectedUserState);
        this.userList = new UserList(this.userState, this.selectedUserState);
        console.log(this.selectedUserState)
        this.todoInput = new TodoInput(this.selectedUserState);
        this.todoList = new TodoList(this.selectedUserState);
        this.todoFilter = new TodoFilter(this.selectedUserState, this.filterState);
        //subscribe
        this.selectedUserState.subscribe(this.title);
        this.selectedUserState.subscribe(this.userList);
        this.selectedUserState.subscribe(this.todoFilter);
        this.selectedUserState.subscribe(this.todoList);


        this.userState.subscribe(this.userList);
        //this.userState.subscribe(this.todoList);
        //this.userState.subscribe(this.todoFilter);

        // this.todoState.subscribe(this.todoList);
        // this.todoState.subscribe(this.todoFilter);
    
        this.filterState.subscribe(this.todoList);
        this.filterState.subscribe(this.todoFilter);

        //this.countState.subscribe(this.todoFilter);
        //초기데이터
        const initData = await userAPI.getAllUser();
        this.userState.set(initData);
        this.selectedUserState.set(initData[0]);

    }

}