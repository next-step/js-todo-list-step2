import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCounter from './components/TodoCounter.js';
import TodoFilters from './components/TodoFilters.js';
import UserTitle from './components/UserTitle.js';
import TodoStore from './libs/TodoStore.js';
import UserStore from './libs/UserStore.js';
import api, { defaultErrorMessage } from './api/index.js';
import UserList from './components/UserList.js';

const App = () => {
  const init = async () => {
    try {
      const userListResult = await api.getUserList();
      if (userListResult.isError) {
        return window.alert(userListResult.errorMessage);
      }
      const { data: initialData } = userListResult;

      const todoStore = new TodoStore(initialData[0].todoList || []);
      const userStore = new UserStore(initialData, todoStore);
      // const todoInput = new TodoInput(store);
      const todoList = new TodoList(todoStore);
      // const todoFilters = new TodoFilters(store);
      // const todoCounter = new TodoCounter(store);

      // store.addObserver(todoList);
      // store.addObserver(todoCounter);
      const userTitle = new UserTitle(userStore);
      const userList = new UserList(userStore);
    } catch (error) {
      return window.alert(defaultErrorMessage);
    }
  };

  init();
};

export default App;
