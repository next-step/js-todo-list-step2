import Component from "./core/component.js";
import { Title  } from  "./component/Title.js"
import { TodoFilter } from "./component/TodoFilter.js";
import { TodoInput } from "./component/TodoInput.js";
import { UserList } from "./component/UserList.js";
import { TodoList } from "./component/TodoList.js";
import { userAPI, todoAPI } from "./api/api.js";

export default class App{
    $state;
    constructor($target){
        this.$state = userAPI.getAllUser().then(
            data =>data[0]
        ); 
        init()
    }
    init(){
        console.log(this.$state)
    }

    template(){

        return `
            <h1 id="user-title" data-username="eastjun">ddd</h1>
            <section>
                <div id="user-list"></div>
            </section>
            <section class="todoapp">
            <section class="input-container"></section>
            <section class="main">
             <ul class="todo-list"></ul>
            </section>
            <div class="count-container">
            </div>
        `
    }
}