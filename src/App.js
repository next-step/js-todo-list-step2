import {
  getUser,
  getUsersList,
  setUser,
  setDeleteUser,
  setAddTodo,
  getUserTodos,
  setDeleteTodo,
  setCompleteToggle,
  setPriorityTodo,
  setUpdateTodo,
} from './api.js';
import TodoCount from './components/TodoCount.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import UserController from './components/UserController.js';
import UserList from './components/UserList.js';
import UserName from './components/UserName.js';
export default function App() {
  this.users = [];
  this.currentUser = [];
  this.loading = false;
  this.userTodoData = [];
  this.init = async () => {
    this.todoInput.render();
    this.users = await getUsersList();
    this.currentUser = await getUser(this.users[0]._id);
    this.render();
  };

  this.render = async () => {
    this.userTodoData = await getUserTodos(this.currentUser._id);
    this.userList.render(this.users, this.currentUser);
    this.userName.render(this.currentUser);
    this.todoList.render(this.userTodoData);
    this.todoCount.render(this.userTodoData);
  };

  this.userName = new UserName();

  this.userList = new UserList({
    userSelecteHandler: async ({ target }) => {
      const id = target.dataset.id;
      if (id === undefined || id === '') return;
      const currentUserData = await getUser(id);
      this.currentUser = currentUserData;
      this.render();
    },
  });

  this.userController = new UserController({
    userCreateHandler: async () => {
      const name = prompt('추가하고 싶은 이름을 입력해주세요.');
      if (name.length < 2) {
        alert('이름은 최소 2글자 이상이어야 합니다.');
        return;
      }
      await setUser({ name });
      this.init();
    },
    userDeleteHandler: async () => {
      console.log(this.currentUser._id);
      await setDeleteUser(this.currentUser._id);
      this.init();
    },
  });

  this.todoList = new TodoList({
    deleteTodo: async ({ target }) => {
      const userId = this.currentUser._id;
      const todoId = target.closest('li').dataset.id;
      if (!target.classList.contains('destroy')) return;
      await setDeleteTodo(userId, todoId);
      this.render();
    },
    completeToggle: async ({ target }) => {
      const userId = this.currentUser._id;
      const todoId = target.closest('li').dataset.id;
      if (!target.classList.contains('toggle')) return;
      await setCompleteToggle(userId, todoId);
      this.render();
    },
    editTodo: ({ target }) => {
      if (!target.classList.contains('label')) return;
      const todoItem = target.closest('li');
      const editInput = document.querySelector('.edit');
      todoItem.classList.toggle('editing');
      editInput.focus();
    },
    updateTodo: async ({ key, target }) => {
      const userId = this.currentUser._id;
      const todoItem = target.closest('li');
      const todoId = todoItem.dataset.id;
      const data = {
        contents: target.value,
      };
      if (!target.classList.contains('edit')) return;
      if (key === 'Escape') {
        todoItem.classList.remove('editing');
      }
      if (key !== 'Enter') return;
      else if (target.value.length < 2) return alert('최소 2글자 이상이어야 합니다.');
      await setUpdateTodo(userId, todoId, data);
      this.render();
    },
    prioritySelect: async ({ target }) => {
      const userId = this.currentUser._id;
      const todoId = target.closest('li').dataset.id;

      if (!target.classList.contains('select')) return;
      const { value } = target;
      const priority = {
        1: 'FIRST',
        2: 'SECOND',
      };
      const data = {
        priority: priority[value],
      };

      await setPriorityTodo(userId, todoId, data);
      this.render();
    },
  });

  this.todoInput = new TodoInput({
    addTodo: async ({ key, target }) => {
      const userId = this.currentUser._id;
      const data = {
        contents: target.value,
      };
      if (key !== 'Enter') return;
      else if (target.value.length < 2) return alert('최소 2글자 이상이어야 합니다.');
      await setAddTodo(userId, data);
      target.value = '';
      this.render();
    },
  });

  this.todoCount = new TodoCount({
    filter: (status) => {
      const completedTodos = this.userTodoData.filter(todo => todo.isCompleted === true);
      const activeTodos = this.userTodoData.filter(todo => todo.isCompleted === false);
      status === "all" && this.todoList.render(this.userTodoData);
      status === "active" && this.todoList.render(activeTodos);
      status === "completed" && this.todoList.render(completedTodos);
    },
  });
}
