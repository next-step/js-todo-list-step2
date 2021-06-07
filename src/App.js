/* @jsx createElement */
import { createElement } from './lib/React.js';
import TodoApp from './components/TodoApp.js';
import UserList from './components/UserList.js';
import TodoInput from './components/TodoInput.js';
import ToggleAll from './components/ToggleAll.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';
import { store } from './index.js';
import { getUsers } from './modules/user/index.js';

const App = () => {
  return (
    <div id="app">
      <UserList />
      <TodoApp>
        <ToggleAll />
        <TodoInput />
        <TodoList />
        <TodoCount />
      </TodoApp>
    </div>
  );
};

export default App;
