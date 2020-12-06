import store from './store/index.js'; 

import Count from './components/count.js';
import List from './components/list.js';
import Input from './components/input.js';
import Filter from './components/filter.js';
import User from './components/user.js';

const countInstance = new Count();
const listInstance = new List();
const InputInstance = new Input();
const FilterInstance = new Filter();
const UserInstance = new User();

countInstance.render();
listInstance.render();
InputInstance.render();
FilterInstance.render();
UserInstance.render();


store.dispatch('loadToDos');
