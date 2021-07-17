import { getUser, getUsersList, setUser, setDeleteUser } from './api.js';
import TodoList from './components/TodoList.js';
import UserController from './components/UserController.js';
import UserList from './components/UserList.js';
import UserName from './components/UserName.js';
export default function App() {
  this.users = [];
  this.currentUser = [];
  this.init = async () => {
    this.users = await getUsersList();
    this.currentUser = await getUser(this.users[0]._id);
    this.render();
  };
  this.render = () => {
    this.userList.render(this.users, this.currentUser);
    this.userName.render(this.currentUser);
    this.todoList.render(this.currentUser.todoList)
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
      console.log(this.currentUser._id)
      await setDeleteUser(this.currentUser._id);
      this.init();
    },
  });
  this.todoList = new TodoList()
}
