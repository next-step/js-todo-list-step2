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
        return alert(userListResult.errorMessage);
      }
      const { data: initialData } = userListResult;

      const todoStore = new TodoStore(
        initialData[0]._id,
        initialData[0].todoList || [],
      );
      const userStore = new UserStore(initialData, todoStore);
      const todoInput = new TodoInput(todoStore);
      const todoList = new TodoList(todoStore);
      const todoFilters = new TodoFilters(todoStore);
      const todoCounter = new TodoCounter(todoStore);

      const userTitle = new UserTitle(userStore);
      const userList = new UserList(userStore);
      todoStore.addObserver(todoList);
      todoStore.addObserver(todoCounter);
      userStore.addObserver(userTitle);
      userStore.addObserver(userList);
    } catch (error) {
      console.error(error);
      return alert(defaultErrorMessage);
    }
  };

  init();
};

export default App;
