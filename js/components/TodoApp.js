import api from '../api.js';
import { TodoList, TodoInput, TodoCount, TodoHeader, UserList } from '../components/index.js';
import {
  $TODO_HEADER,
  $TODO_LIST,
  $TODO_INPUT,
  $TODO_COUNT,
  $USER_LIST
} from '../config/htmlElement.js';

// TodoApp: Todo 앱 전체의 상태를 관리
export default class TodoApp {
  USER_NAME = '';

  constructor(userName) {
    this.USER_NAME = userName;
    this.initTodoAppComponents();
  }

  async initTodoAppComponents() {
    if (this.USER_NAME) {
      this.todoInfo = await api.fetchTodoInfo(this.USER_NAME);
      this.todoItems = this.todoInfo.todoList;

      this.todoHeader = new TodoHeader({
        $element: $TODO_HEADER,
        userName: this.USER_NAME
      });

      new TodoInput({
        userName: this.USER_NAME,
        $element: $TODO_INPUT,
        onEnter: () => {
          this.setState();
        }
      });

      this.todoList = new TodoList({
        userName: this.USER_NAME,
        $element: $TODO_LIST,
        todoItems: this.todoItems,
        onToggleItem: () => {
          this.setState();
        },
        onDeleteItem: () => {
          this.setState();
        },
        onEditItem: () => {
          this.setState();
        }
      });

      this.todoCount = new TodoCount({
        $element: $TODO_COUNT,
        totalCount: this.todoItems.length,
        completeCount: this.todoItems.filter(item => item.isCompleted).length
      });

      this.initUserList();
    }
  }

  async initUserList() {
    const userList = await api.fetchUserList();
    this.userList = new UserList({
      $element: $USER_LIST,
      userList: userList,
      activeUser: this.USER_NAME,
      onSelectUser: name => {
        if (this.USER_NAME !== name) {
          this.USER_NAME = name;
          this.userList.setState(name);
          this.todoHeader.setState(name);
          this.setState();
        }
      }
    });
  }

  async setState() {
    this.todoInfo = await api.fetchTodoInfo(this.USER_NAME);
    const { todoList } = this.todoInfo;
    this.todoList.setState(todoList);
    this.todoCount.setState({
      totalCount: todoList.length,
      completeCount: todoList.filter(item => item.isCompleted).length
    });
    this.todoItems = todoList;
  }
}
