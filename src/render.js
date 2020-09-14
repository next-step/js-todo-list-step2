import UserTitle from './components/User/UserTitle.js';
import UserList from './components/User/UserList.js';
import TodoApp from './components/Todo/TodoApp.js';

const $app = document.getElementById('app');

const $UserTitle = UserTitle({ name: 'ho' });
const $UserList = UserList({});
const $TodoApp = TodoApp({});

const template = `
    ${ $UserTitle }
    ${ $UserList }
    ${ $TodoApp }
`;

$app.innerHTML = template;





