import TodoHeader from './components/todoHeader.js';
import UserList from './components/userList.js';
import TodoList from './components/todoList.js';
import TodoInput from './components/todoInput.js';
import TodoCount from './components/todoCount.js';
import { ALL } from './constant/constant.js';

class App {
  constructor($target, dataController) {
    this.state = {
      currentUser: '',
      filter: ALL,
      users: {},
    };
    this.$target = $target;

    // header
    this.header = new TodoHeader(document.querySelector('#user-title'));

    // userList
    this.userList = new UserList(
      document.querySelector('#user-list-container'),
      dataController,
      {
        onUpdateUser: this.onUpdateUser,
        onDeleteUser: this.onDeleteUser,
      }
    );


    // todoinput
    this.todoInput = new TodoInput(document.querySelector('.new-todo'),
    {
      dataController,
      onKeyDown: this.onKeyDown,
    });

    // todolist
    this.todoList = new TodoList(document.querySelector('.todo-list'),
    {
      filter: this.state.filter,
      onDeleteItem: this.onDeleteItem,
      changeTodoState: this.changeTodoState,
      changeTodoValue: this.changeTodoValue,
      dataController,
    });

    // todoCount
    this.todoCount = new TodoCount(document.querySelector('.count-container'),
    {
      filter: this.state.filter,
      changeFilter: this.changeFilter,
      clearList: this.clearList,
       dataController
    });

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
    this.header.setState(currentUser);
    this.userList.setState({ users, currentUser });
    this.todoInput.setState(users[currentUser]);

    // NOTE
    // users[`${currentUser}`]는 undefined가 아니고
    // users.currentUser는 undefined임.... 왜??
    // type을 알 수 없기 때문인가..?

    this.todoList.setState({
      user: users[currentUser],
      filter: this.state.filter,
    });
    this.todoCount.setState({
      user: users[currentUser],
      filter: this.state.filter,
    });
    this.setState({ ...this.state, users, currentUser });
    console.log(this.state);
  };

  onUpdateUser = (newUser) => {
    const users = { ...this.state.users };
    const currentUser = newUser.name;
    users[currentUser] = newUser;
    this.header.setState(currentUser);
    this.userList.setState({ users, currentUser });
    this.todoInput.setState(users[currentUser]);
    this.todoList.setState({
      user: users[currentUser],
      filter: this.state.filter,
    });
    this.todoCount.setState({
      user: users[currentUser],
      filter: this.state.filter,
    });
    this.setState({ ...this.state, currentUser, users });
  };

  onDeleteUser = (userName) => {
    const users = { ...this.state.users };
    let currentUser = this.state.currentUser;
    if (userName === this.state.currentUser) {
      const keys = Object.keys(users)[0];
      currentUser = keys;
      this.header.setState(currentUser);
    }
    delete users[userName];
    this.userList.setState({ users, currentUser });
    this.todoInput.setState(users[currentUser]);
    this.todoList.setState({
      user: users[currentUser],
      filter: this.state.filter,
    });
    this.todoCount.setState({
      user: users[currentUser],
      filter: this.state.filter,
    });
    this.setState({ ...this.state, currentUser, users });
  };

  onKeyDown = (value) => {
    const newState = { ...this.state };
    const { currentUser } = this.state;
    const todoList = [...newState.users[currentUser].todoList, value];
    newState.users[currentUser].todoList = todoList;
    this.todoList.setState({
      user: newState.users[currentUser],
      filter: this.state.filter,
    });
    this.setState(newState);
  };

  onDeleteItem = (index) => {
    const { currentUser } = this.state;
    const todoList = [...this.state.users[currentUser].todoList];
    todoList.splice(index, 1);
    const newState = { ...this.state };

    // 구조분해 할당으로 하는 법 ???
    // const newState = {...this.state, users: { ...this.state.users, currentUser : { todoList : ...todoList }}}
    // 안됨...

    newState.users[currentUser].todoList = todoList;
    this.todoList.setState({
      user: newState.users[currentUser],
      filter: this.state.filter,
    });
    this.setState(newState);
  };

  changeTodoState = (index, state) => {
    const { currentUser } = this.state;
    const newState = { ...this.state };
    const todoList = [...newState.users[currentUser].todoList];
    todoList[index].isCompleted = state;
    newState.users[currentUser].todoList = todoList;
    this.todoList.setState({
      user: newState.users[currentUser],
      filter: this.state.filter,
    });
    this.setState(newState);
  };

  changeTodoValue = (index, value) => {
    const { currentUser } = this.state;
    const newState = { ...this.state };
    const todoList = [...newState.users[currentUser].todoList];
    todoList[index].contents = value;
    newState.users[currentUser].todoList = todoList;
    this.todoList.setState({
      user: newState.users[currentUser],
      filter: this.state.filter,
    });
    this.setState(newState);
  };

  changeFilter = (name) => {
    const newState = { ...this.state, filter: name };
    const { currentUser } = newState;
    this.todoList.setState({
      user: newState.users[currentUser],
      filter: newState.filter,
    });
    this.todoCount.setState({
      user: newState.users[currentUser],
      filter: newState.filter,
    });
    this.setState(newState);
  };

  clearList = () => {
    const newState = { ...this.state };
    const { currentUser } = newState;
    newState.users[currentUser].todoList = [];
    this.todoList.setState({
      user: newState.users[currentUser],
      filter: newState.filter,
    });
    this.todoCount.setState({
      user: newState.users[currentUser],
      filter: newState.filter,
    });
    this.setState(newState);
  }

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
