import Title from './components/Title.js';
import UserList from './components/UserList.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';

import { userAPI } from './apis/user.js';
import { todoListAPI } from './apis/todolist.js';

export default class App {
  constructor($app) {
    this.state = {
      userList: [],
      activeId: '',
      activeUsername: '',
      activeTodoList: [],
      isLoading: true,
    };

    this.title = new Title({ $target: $app });
    this.userList = new UserList({
      $target: $app,
      changeActiveUser: (id) => {
        this.setActiveData(id);
      },
      createUser: async (name) => {
        try {
          const userData = await userAPI.createUser({ name });
          this.state.userList.push(userData);
          this.setActiveData(userData._id);
        } catch (error) {
          throw new Error(error);
        }
      },
      deleteUser: async () => {
        try {
          await userAPI.removeUser(this.state.activeId);
          this.setState({
            ...this.state,
            userList: this.state.userList.filter(
              ({ _id }) => this.state.activeId !== _id
            ),
          });
          this.setActiveData(this.state.userList[0]._id);
        } catch (error) {
          throw new Error(error);
        }
      },
    });

    const todoApp = document.createElement('section');
    todoApp.className = 'todoapp';

    new TodoInput({
      $target: todoApp,
      addTodo: async (todo) => {
        try {
          await todoListAPI.createItem(this.state.activeId, todo);
          this.setState({ ...this.state });
        } catch (error) {
          throw new Error(error);
        }
      },
    });

    const main = document.createElement('section');
    main.className = 'main';

    this.todoList = new TodoList({
      $target: main,
      initialState: {
        isLoading: this.state.isLoading,
        todoList: this.state.activeTodoList,
      },
    });
    new TodoCount({ $target: main });

    todoApp.appendChild(main);
    $app.appendChild(todoApp);

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.fetch();
    this.title.setState(this.state.activeUsername);
    this.userList.setState({
      activeId: this.state.activeId,
      activeUsername: this.state.activeUsername,
      userList: this.state.userList,
    });
    this.todoList.setState({
      isLoading: this.state.isLoading,
      todoList: this.state.activeTodoList,
    });
  }

  async fetch() {
    try {
      this.state.isLoading = true;
      this.state.userList = await userAPI.fetchUserList();
      this.state.activeTodoList = await todoListAPI.fetchTodoItems(
        this.state.activeId
      );
    } catch (error) {
      throw new Error(error);
    }
    {
      this.todoList.setState({
        ...this.todoList.state,
        isLoading: false,
      });
    }
  }

  setActiveData(user_id) {
    const user = this.state.userList.filter(({ _id }) => user_id === _id)[0];
    this.setState({
      ...this.state,
      activeId: user._id,
      activeUsername: user.name,
      activeTodoList: user.todoList,
      isLoading: false,
    });
  }

  async init() {
    try {
      this.state.userList = await userAPI.fetchUserList();
      if (this.state.userList.length === 0) return;
      this.setActiveData(this.state.userList[0]._id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
