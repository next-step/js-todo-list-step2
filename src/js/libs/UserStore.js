import Subject from './Subject.js';
import api from '../api/index.js';

class UserStore extends Subject {
  constructor(userList, todoStore) {
    super();
    this.todoStore = todoStore;
    this.userList = userList;
    this.currentUserName = userList[0].name || '';
    this.currentUserId = userList[0]._id;
  }

  addUser(userData) {
    this.userList = [userData, ...this.userList];
    this.setCurrentUser(userData._id);
  }

  removeUser(userId) {
    let removedIndex = 0;
    let nextId = '';
    this.userList = this.userList.filter((user, index) => {
      if (user._id === userId) removedIndex = index;
      return user._id !== userId;
    });
    if (removedIndex === this.userList.length) {
      nextId = this.userList[removedIndex - 1]._id;
    } else {
      nextId = this.userList[removedIndex]._id;
    }
    this.setCurrentUser(nextId);
  }

  async setCurrentUser(userId) {
    try {
      const result = await api.getUser(userId);
      if (result.isError) {
        return window.alert(result.errorMessage);
      }
      const { todoList, name } = result.data;
      this.currentUserId = userId;
      this.currentUserName = name;
      this.notifyAll();
      this.todoStore.initTodoList(userId, todoList);
    } catch (error) {}
  }
}

export default UserStore;
