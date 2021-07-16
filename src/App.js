import Title from './components/Title.js';
import UserList from './components/UserList.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';

import { userAPI } from './apis/user.js';
import { todoListAPI } from './apis/todolist.js';

import { ALL, ACTIVE, COMPLETED } from './constants/todo.js';

export default class App {
  constructor($app) {
    this.state = {
      userList: [],
      activeId: '',
      activeUsername: '',
      activeTodolist: [],
      show: ALL,
      count: 0,
    };

    this.title = new Title({ $target: $app });
    this.userList = new UserList({
      $target: $app,
      changeActiveUser: async (id) => {
        try {
          const { _id, name, todoList } = await userAPI.fetchUser(id);
          this.setState({
            ...this.state,
            activeId: _id,
            activeUsername: name,
            activeTodolist: todoList,
          });
        } catch (error) {
          throw new Error(error);
        }
      },
      createUser: async (name) => {
        try {
          const newUser = await userAPI.createUser({ name });
          this.setState({
            ...this.state,
            activeId: newUser._id,
            activeUsername: newUser.name,
            activeTodolist: newUser.todoList,
          });
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
          this.init();
          // this.setActiveData(this.state.userList[0]._id);
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
    this.todoCount = new TodoCount({
      $target: main,
      initialState: {
        show: this.state.show,
        count: this.state.count,
      },
      onClick: (show) => {
        this.setState({ ...this.state, show });
      },
    });

    todoApp.appendChild(main);
    $app.appendChild(todoApp);

    this.init();
  }

  async setState(nextState) {
    try {
      this.state = nextState;
      this.todoList.setState({
        isLoading: true,
        todoList: [],
      });
      this.state.userList = await userAPI.fetchUserList();
      this.state.activeTodolist = await todoListAPI.fetchTodoItems(
        this.state.activeId
      );
      this.title.setState(this.state.activeUsername);
      this.userList.setState({
        activeId: this.state.activeId,
        activeUsername: this.state.activeUsername,
        userList: this.state.userList,
      });
      this.todoCount.setState({
        show: this.state.show,
        count: this.state.activeTodolist.filter(({ isCompleted }) => {
          if (this.state.show === ACTIVE) return !isCompleted;
          else if (this.state.show === COMPLETED) return isCompleted;
          else return true;
        }).length,
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      this.state.isLoading = false;
      this.todoList.setState({
        isLoading: this.state.isLoading,
        todoList: this.state.activeTodolist.filter(({ isCompleted }) => {
          if (this.state.show === ACTIVE) return !isCompleted;
          else if (this.state.show === COMPLETED) return isCompleted;
          else return true;
        }),
      });
    }
  }

  // async fetch() {
  //   try {

  //   } catch (error) {
  //     throw new Error(error);
  //   } finally {
  //     this.todoList.setState({
  //       ...this.todoList.state,
  //     });
  //   }
  // }

  setActiveData(user_id) {
    const user = this.state.userList.filter(({ _id }) => user_id === _id)[0];
    this.setState({
      ...this.state,
      activeId: user._id,
      activeUsername: user.name,
      activeTodolist: user.todoList,
    });
  }

  async init() {
    try {
      this.state.userList = await userAPI.fetchUserList();
      if (this.state.userList.length === 0) return;
      const firstUser = this.state.userList[0];
      this.setState({
        ...this.state,
        activeId: firstUser._id,
        activeUsername: firstUser.name,
        activeTodolist: firstUser.todoList,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
