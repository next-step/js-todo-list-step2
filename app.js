import TodoList from './components/TodoList.js';
import TodoInput from './components/TodoInput.js';
import TodoFilter from './components/TodoFilter.js';
import { FILTER_TYPE } from './constants.js';
import { getTodoList, postTodoItem, deleteTodoItem, toggleTodoItem, editTodoItem } from './api/index.js';

const USERNAME = 'soyoung';

function TodoApp() {
  this.todoList = [];

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
      const { todoList } = await getTodoList(USERNAME);
      this.todoList = todoList;
    } catch (error) {
      this.todoList = [];
    }
  }

  this.init = () => {
    this.setState();
  }

  this.TodoList = new TodoList({
    deleteTodo: async id => {
      await deleteTodoItem(USERNAME, id);
      this.setState();
    },
    toggleTodo: async id => {
      await toggleTodoItem(USERNAME, id);
      this.setState();
    },
    editTodo: async (id, value) => {
      await editTodoItem(USERNAME, id, value);
      this.setState();
    }
  });
  this.TodoInput = new TodoInput({
    addTodo: async value => {
      await postTodoItem(USERNAME, value);
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
}

const app = new TodoApp();
app.init();
