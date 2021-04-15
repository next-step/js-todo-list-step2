import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCounter from './components/TodoCounter.js';
import TodoFilters from './components/TodoFilters.js';
import TodoStore from './libs/TodoStore.js';
import api, { defaultErrorMessage } from './api/index.js';

const App = () => {
  const init = async () => {
    try {
      const userListResult = await api.getUserList();
      if (userListResult.isError) {
        return window.alert(userListResult.errorMessage);
      }
      const store = new TodoStore(userListResult.data || []);
      // const todoInput = new TodoInput(store);
      const todoList = new TodoList(store);
      // const todoFilters = new TodoFilters(store);
      // const todoCounter = new TodoCounter(store);

      // store.addObserver(todoList);
      // store.addObserver(todoCounter);
    } catch (error) {
      return window.alert(defaultErrorMessage);
    }
  };

  init();
};

export default App;
