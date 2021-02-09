import {API} from '../../api/api.js';
import {todoListTemplate, progressTemplate} from './todoTemplates.js';

const todoCount = (todos) => {
    const $todoCountStrong = document.querySelector('.todo-count strong');
    $todoCountStrong.innerHTML = todos.length;
};
                               
const renderTitle = (name) => {
    const $userTitle = document.querySelector('#user-title strong');
    $userTitle.innerHTML = name;
};

const renderTodos = (todos) => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.innerHTML = '';
    $todoList.insertAdjacentHTML('beforeend', progressTemplate());
    todos.map((todo) => {
        $todoList.insertAdjacentHTML('beforeend', todoListTemplate(todo));
    });
};

const filterTodos =(todos, option) => {
    const filters = {
        all : () => todos,
        active : () => todos.filter((todo) => todo.isCompleted === false),
        completed : () => todos.filter((todo) => todo.isCompleted === true),
    };
    return filters[option]();
};

export const loadTodos = async (userId, option = 'all') => {
    const user = await API.getUser(userId);
    const todos =await filterTodos(user.todoList, option);

    renderTitle(user.name);
    renderTodos(todos);
    todoCount(todos);
}

