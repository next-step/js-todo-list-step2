import {initControlTodo} from './controlTodo.js';
import {initAddTodo} from './addTodo.js';
import {initDeleteAllTodos} from './deleteAllTodos.js';
import {initEditTodo} from './editTodo.js';

import {filterTodo} from './filterTodo.js';
import {editPriority} from './editPriority.js';

export const todoList = () => {
    initControlTodo();
    initAddTodo();
    initDeleteAllTodos();
    initEditTodo();

    filterTodo();
    editPriority();
};