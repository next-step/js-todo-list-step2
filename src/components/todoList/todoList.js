import {changeTodoList} from './controlTodo.js';
import {filterTodo} from './filterTodo.js';
import {editPriority} from './editPriority.js';

export const todoList = () => {
    changeTodoList();
    filterTodo();
    editPriority();
};