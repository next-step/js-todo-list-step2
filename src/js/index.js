import { setter, getters } from './store/index.js';
import { observe } from './core/Observer.js';
import '../components/title.js';

const newUser = {
  name: 'ey',
  _id: '123',
  todoList: [],
};


observe(() => console.log(getters.user));

setter.userName(newUser.name);
// setter.userName(newUser.name);
// setter.userName(newUser.name);


