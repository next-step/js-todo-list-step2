import { getUser, getUsersList, setUser, setDeleteUser, setAddTodo, getUserTodos, setDeleteTodo } from './api.js';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';
import UserController from './components/UserController.js';
import UserList from './components/UserList.js';
import UserName from './components/UserName.js';
export default function App() {
  this.users = [];
  this.currentUser = [];
  this.loading = false;

  this.init = async () => {
    this.todoInput.render();
    this.users = await getUsersList();
    this.currentUser = await getUser(this.users[0]._id);
    this.render();
  };

  this.render = async () => {
    const userTodoData = await getUserTodos(this.currentUser._id);
    this.userList.render(this.users, this.currentUser);
    this.userName.render(this.currentUser);
    this.todoList.render(userTodoData);
  };

  this.userName = new UserName();

  this.userList = new UserList({
    userSelecteHandler: async event => {
      const id = event.target.dataset.id;
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
    deleteTodo: async event => {
      const target = event.target;
      const userId = this.currentUser._id;
      const todoId = target.dataset.id;
      if (!target.classList.contains('destroy')) return;
      await setDeleteTodo(userId, todoId);
      this.render();
    },
  });
  
  this.todoInput = new TodoInput({
    addTodo: async event => {
      const id = this.currentUser._id;
      const value = {
        contents: event.target.value,
      };
      if (event.code !== 'Enter') return;
      else if (value.length < 2) return alert('최소 2글자 이상이어야 합니다.');
      await setAddTodo(id, value);
      event.target.value = '';
      this.render();
    },
  });
}
