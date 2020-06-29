import api from '../api.js';
import { TodoList, Input, TodoCount, TodoHeader, UserList } from '../components/index.js';
import {
  $TODO_HEADER,
  $TODO_LIST,
  $TODO_INPUT,
  $TODO_COUNT,
  $USER_LIST
} from '../config/htmlElement.js';

export default class TodoApp {
  USER_NAME = '';

  constructor(userName) {
    this.USER_NAME = userName;
    if (this.USER_NAME) {
      this.todoHeader = new TodoHeader({
        $element: $TODO_HEADER,
        name: this.USER_NAME
      });

      new Input({
        $element: $TODO_INPUT,
        onEnter: async content => {
          await api.addNewTodoItem(this.USER_NAME, content);
          this.setState();
        }
      });

      this.initTodoList().then(() => {
        this.todoCount = new TodoCount({
          $element: $TODO_COUNT,
          totalCount: this.todoItems.length,
          completeCount: this.todoItems.filter(item => item.isCompleted).length
        });
      });

      this.initUserList();
    }
  }

  async initTodoList() {
    this.todoInfo = await api.fetchTodoInfo(this.USER_NAME);
    this.todoItems = this.todoInfo.todoList;
    this.todoList = new TodoList({
      $element: $TODO_LIST,
      todoItems: this.todoItems,
      onToggleItem: async id => {
        await api.toggleItem(this.USER_NAME, id);
        this.setState();
      },
      onDeleteItem: async id => {
        await api.deleteItem(this.USER_NAME, id);
        this.setState();
      },
      onEditItem: async (id, saveContent) => {
        if (saveContent) {
          await api.modifyItem(this.USER_NAME, id, saveContent);
        }
        this.setState();
      }
    });
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
