import {TodoClearButton} from "./components/todo/TodoClearButton.js";
import {TodoCount} from "./components/todo/TodoCount.js";
import {TodoFilter} from "./components/todo/TodoFilter.js";
import {TodoInput} from "./components/todo/TodoInput.js";
import {TodoList} from "./components/todo/TodoList.js";
import {UserList} from "./components/user/UserList.js";
import {UserTitle} from "./components/user/UserTitle.js";

const $userList = document.querySelector('#user-list');
const $userTitle = document.querySelector('#user-title');
const $todoList = document.querySelector('.todo-list');
const $todoInput = document.querySelector('.new-todo');
const $todoCounter = document.querySelector('.todo-count');
const $todoFilter = document.querySelector('.filters');
const $todoClear = document.querySelector('.clear-completed');
class App{

    $target ;
    $filter_type;
    constructor($target = {} ) {
        this.$target = $target;
        console.log(this.$target);

        new TodoClearButton(this.$target.$todoClear , {});
        new TodoCount(this.$target.$todoCounter , {});
        new TodoFilter(this.$target.$todoFilter , {});
        new TodoInput(this.$target.$todoInput , {});
        new TodoList(this.$target.$todoList , {});

        new UserList(this.$target.$userList , {});
        new UserTitle(this.$target.$userTitle , {});


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

