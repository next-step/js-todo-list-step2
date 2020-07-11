import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import TodoFilter from './components/TodoFilter.js';
import UserList from './components/UserList.js';
import { FILTER_TYPE } from './constants.js';
import {
  getTodoList,
  postTodoItem,
  deleteTodoItem,
  toggleTodoItem,
  editTodoItem,
  getUsers,
} from './api/index.js';

function TodoApp() {
  this.todoList = [];
  this.user = '';

  this.setState = async () => {
    await this.getTodoList();
    this.TodoList.setState(this.todoList);
    this.$todoCount.innerHTML = `총 <strong>${this.todoList.length}</strong> 개`;
  };

  this.getTodoList = async () => {
    try {
      const { todoList } = await getTodoList(this.user);
      if (!todoList) throw Error('This user do not have todo list');
      this.todoList = todoList;
    } catch (error) {
      this.todoList = [];
    }
  };

  this.init = async () => {
    const list = await getUsers();
    if (list && list.length) {
      this.UserList.setState(list);
      this.UserList.selectUser(list[0]._id);
    }
    if (!this.user) return;
    this.setState();
  };

  this.TodoList = new TodoList({
    deleteTodo: async (id) => {
      await deleteTodoItem(this.user, id);
    },
    toggleTodo: async (id) => {
      await toggleTodoItem(this.user, id);
    },
    editTodo: async (id, value) => {
      await editTodoItem(this.user, id, value);
    },
    setRootState: this.setState
  });
  this.TodoInput = new TodoInput({
    addTodo: async (value) => {
      await postTodoItem(this.user, value);
      this.setState();
    },
  });
  this.$todoCount = document.querySelector('.todo-count');
  this.TodoFilter = new TodoFilter({
    filterTodo: (mode) => {
      const renderList = {
        [FILTER_TYPE.ALL]: () => this.todoList,
        [FILTER_TYPE.ACTIVE]: () =>
          this.todoList.filter((item) => !item.isCompleted),
        [FILTER_TYPE.COMPLETED]: () =>
          this.todoList.filter((item) => item.isCompleted),
      };
      this.TodoList.setState(renderList[mode]());
    },
  });
  this.UserList = new UserList({
    selectUser: (user) => {
      this.user = user;
      this.setState();
    },
  });
}

const app = new TodoApp();
app.init();
