import store from './store/index.js';

import Count from './components/todoList/count.js';
import List from './components/todoList/list.js';
import Input from './components/todoList/input.js';
import Filter from './components/todoList/filter.js';
import DeleteAll from './components/todoList/deleteAll.js';

import User from './components/user/user.js';
import UserName from './components/user/userName.js';

const countInstance = new Count();
const listInstance = new List();
const InputInstance = new Input();
const FilterInstance = new Filter();
const UserInstance = new User();
const DeleteAllInstance = new DeleteAll();
const UserNameInstance = new UserName();

countInstance.render();
listInstance.render();
InputInstance.render();
FilterInstance.render();
UserInstance.render();
DeleteAllInstance.render();
UserNameInstance.render();

store.dispatch('loadUsersToDos');
