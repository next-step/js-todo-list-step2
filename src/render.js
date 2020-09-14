import UserTitle from './components/User/UserTitle.js';
import UserList from './components/User/UserList.js';
import TodoApp from './components/Todo/TodoApp.js';
import { setEvent } from './event.js';
import { setter } from './store/index.js';

const $app = document.getElementById('app');

const components = {};


export const render = () => {
    components.$UserTitle = UserTitle({ name: 'ho' });
    components.$UserList = UserList({});
    components.$TodoApp = TodoApp({});

    const {$UserTitle, $UserList, $TodoApp } = components;

    $app.innerHTML = `
    ${ $UserTitle }
    ${ $UserList }
    ${ $TodoApp }
    `;
};







