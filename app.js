import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import TodoFilter from './components/TodoFilter.js';
import UserList from './components/UserList.js';
import { FILTER_TYPE } from './constants.js';
import { getTodoList, postTodoItem, deleteTodoItem, toggleTodoItem, editTodoItem, getUsers } from './api/index.js';

function TodoApp() {
  this.todoList = [];
  this.user = '';

  this.findIndexById = id => {
    return this.todoList.findIndex(item => item._id === id);
  };

  this.setState = async () => {
    await this.getTodoList();
    this.TodoList.setState(this.todoList);
    this.$todoCount.innerHTML = `총 <strong>${this.todoList.length}</strong> 개`;
  };

  this.getTodoList = async () => {
    try {
      const { todoList } = await getTodoList(this.user);
      this.todoList = todoList;
    } catch (error) {
      this.todoList = [];
    }
  }

  this.init = async () => {
    const list = await getUsers();
    this.UserList.setState(list);
    if (!this.user) return;
    this.setState();
  }

  this.TodoList = new TodoList({
    deleteTodo: async id => {
      await deleteTodoItem(this.user, id);
      this.setState();
    },
    toggleTodo: async id => {
      await toggleTodoItem(this.user, id);
      this.setState();
    },
    editTodo: async (id, value) => {
      await editTodoItem(this.user, id, value);
      this.setState();
    }
  });
  this.TodoInput = new TodoInput({
    addTodo: async value => {
      await postTodoItem(this.user, value);
      this.setState();
    }
  });
  this.$todoCount = document.getElementsByClassName('todo-count')[0];
  this.TodoFilter = new TodoFilter({
    filterTodo: mode => {
      const renderList = {
        [FILTER_TYPE.ALL]: () => this.todoList,
        [FILTER_TYPE.ACTIVE]: () => this.todoList.filter(item => !item.isCompleted),
        [FILTER_TYPE.COMPLETED]: () => this.todoList.filter(item => item.isCompleted)
      };
      this.TodoList.setState(renderList[mode]());
    }
  });
  this.UserList = new UserList({
    selectUser: user => {
      this.user = user;
      this.setState();
    }
  });
}

const app = new TodoApp();
app.init();
