import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCounter from './components/TodoCounter.js';
import TodoFilters from './components/TodoFilters.js';
import UserTitle from './components/UserTitle.js';
import TodoStore from './libs/TodoStore.js';
import UserStore from './libs/UserStore.js';
import api from './api/index.js';
import UserList from './components/UserList.js';

const App = () => {
  const init = async () => {
    try {
      const initialData = await api.getUserList();
      const todoStore = new TodoStore(
        initialData[0]._id,
        initialData[0].todoList || [],
      );
      const userStore = new UserStore(initialData, todoStore);
      const todoList = new TodoList(todoStore);
      const todoCounter = new TodoCounter(todoStore);
      new TodoInput(todoStore);
      new TodoFilters(todoStore);

      const userTitle = new UserTitle(userStore);
      const userList = new UserList(userStore);
      todoStore.addObserver(todoList);
      todoStore.addObserver(todoCounter);
      userStore.addObserver(userTitle);
      userStore.addObserver(userList);
    } catch (error) {
      return alert(error);
    }
  };
  init();
};

export default App;
