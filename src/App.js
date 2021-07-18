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
    console.log(userTodoData);
    this.userList.render(this.users, this.currentUser);
    this.userName.render(this.currentUser);
    this.todoList.render(userTodoData);
  };

  this.userName = new UserName();

  this.userList = new UserList({
    userSelecteHandler: async ({target}) => {
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
    deleteTodo: async ({target}) => {
      const userId = this.currentUser._id;
      const todoId = target.closest('li').dataset.id;
      if (!target.classList.contains('destroy')) return;
      await setDeleteTodo(userId, todoId);
      this.render();
    },
    completeToggle: async ({target}) => {
      const userId = this.currentUser._id;
      const todoId = target.closest('li').dataset.id;
      if (!target.classList.contains('toggle')) return;
      await setCompleteToggle(userId, todoId);
      this.render();
    },
    editTodo: ({target}) => {
      if (!target.classList.contains('label')) return;
      const todoItem = target.closest('li');
      this.editTarget = todoItem;
      const editInput = document.querySelector('.edit');
      todoItem.classList.toggle('editing');
      editInput.focus();
    },
    updateTodo: async ({ key, target }) => {
      const userId = this.currentUser._id;
      const todoId = target.closest('li').dataset.id;
      const data = {
        contents: target.value,
      };
      if (!target.classList.contains('edit')) return;
      if (key === 'Escape') {
        todoItem.classList.remove('editing');
      }
      if (key !== 'Enter') return;
      if (target.value === '') return;
      if (key !== 'Enter') return;
      else if (target.value.length < 2) return alert('최소 2글자 이상이어야 합니다.');
      await setUpdateTodo(userId,todoId, data);
      this.render();
    },
    prioritySelecte: async ({target}) => {
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
    cancleEdit : ({target}) => {
      if (target.classList.contains('edit') || this.editTarget === null) {
        return;
      }
      this.editTarget.classList.remove('editing');
    }
  });

  this.todoInput = new TodoInput({
    addTodo: async ({ key, target } ) => {
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
}
