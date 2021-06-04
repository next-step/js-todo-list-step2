import TodoHeader from './components/todoHeader.js';
import UserList from './components/userList.js';
import TodoList from './components/todoList.js';
import { ALL } from './constant/constant.js';

class App {
  constructor($target, dataController) {
    // const defaultState = localStorage.getItem('myState');
    // // Nullish coalescing operator
    // this.state = JSON.parse(defaultState) ?? { todos: [], selected: ALL };
    this.state = {
      currentUser : '',
      filter: ALL,
      users : {}
    }
    this.$target = $target;
    this.dataController = dataController;
    
    // userList
    this.userList = new UserList(document.querySelector('#user-list-container'),
    this.dataController,
    {
      onUpdateUser: this.onUpdateUser,
      onDeleteUser: this.onDeleteUser
    });


    // header
    this.header = new TodoHeader(document.querySelector('#user-title'));

    // // todoinput
    // this.todoInput = new TodoInput(
    //   document.querySelector('.new-todo'),
    //   this.onKeyDown
    // );

    // todolist
    this.todoList = new TodoList(document.querySelector('.todo-list'),
    {
      todoList: [],
      filter: this.state.filter,
      onDeleteItem: this.onDeleteItem,
      changeTodoState: this.changeTodoState,
      changeTodoValue: this.changeTodoValue,
    });

    // // todoCount
    // this.todoCount = new TodoCount(document.querySelector('.count-container'), {
    //   state: this.state,
    //   changeSelected: this.changeSelected,
    // });
    this.init();
  }

  init = async () => {
    const userList = await this.userList.getUsers();
    const users = {};
    let currentUser = '';
    userList.forEach((user) => {
      users[`${user.name}`] = user;
      currentUser = user.name;
    });
    this.userList.setState({users, currentUser});
    this.header.setState(currentUser);
    this.setState({...this.state, users, currentUser})
  }

  onUpdateUser = (newUser) => {
    const users = {...this.state.users};
    const currentUser = newUser.name;
    users[`${currentUser}`] = newUser;
    this.header.setState(currentUser);
    this.userList.setState({users, currentUser});
    this.setState({...this.state, currentUser, users});
  }

  onDeleteUser = (userName) => {
    const users = {...this.state.users};
    let currentUser = this.state.currentUser;
    if (userName === this.state.currentUser) {
      const keys = Object.keys(users)[0];
      currentUser = keys;
      this.header.setState(currentUser);
    }
    delete users[userName];
    this.userList.setState({users, currentUser});
    this.setState({...this.state, currentUser, users});
  }

  // onKeyDown = (value) => {
  //   const newTodoItems = {
  //     ...this.state,
  //     todos: [...this.state.todos, { value, state: VIEW }],
  //   };
  //   this.setState(newTodoItems);
  // };
  onDeleteItem = (index) => {
    const newTodoItems = this.state.todos;
    newTodoItems.splice(index, 1);
    const newState = { ...this.state, todos: newTodoItems };
    this.setState(newState);
  };

  changeTodoState = (index, state) => {
    const newTodos = [...this.state.todos];
    newTodos[index].state = state;
    const newState = { ...this.state, todos: newTodos };
    this.setState(newState);
  };

  changeTodoValue = (index, value) => {
    const newTodos = [...this.state.todos];
    newTodos[index].value = value;
    const newState = { ...this.state, todos: newTodos };
    this.setState(newState);
  };

  // changeSelected = (name) => {
  //   const newState = { ...this.state, selected: name };
  //   this.setState(newState);
  // };
  // // NOTE onKeyPress(value) {}는 동작하지 않습니다.
  // // 왜 안되는지 this에 대해서 다시 공부해봅시다.
  setState = (nextState) => {
    this.state = nextState;
    // localStorage.setItem('myState', JSON.stringify(this.state));
    // this.todoList.setState(this.state);
    // this.todoCount.setState(this.state);
  };
}

export default App;