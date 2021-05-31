import Subject from './Subject.js';

class UserStore extends Subject {
  constructor(userList, todoStore) {
    super();
    this.todoStore = todoStore;
    this.userList = userList ?? [];
    this.currentUserName = userList[0] ? userList[0].name : '';
    this.currentUserId = userList[0] ? userList[0]._id : '';
  }

  addUser(userData) {
    this.userList = [userData, ...this.userList];
    this.setCurrentUser(userData._id, userData.name);
  }

  removeUser(userId) {
    let removedIndex = 0;
    let nextId = '';
    let nextName = '';
    this.userList = this.userList.filter((user, index) => {
      if (user._id === userId) removedIndex = index;
      return user._id !== userId;
    });
    if (removedIndex === this.userList.length) {
      const nextUser = this.userList[removedIndex - 1];
      nextId = nextUser._id;
      nextName = nextUser.name;
    } else {
      const nextUser = this.userList[removedIndex];
      nextId = nextUser._id;
      nextName = nextUser.name;
    }
    this.setCurrentUser(nextId, nextName);
  }

  setCurrentUser(userId, userName) {
    this.currentUserId = userId;
    this.currentUserName = userName;
    this.notifyAll();
    this.todoStore.initTodoList(userId);
  }
}

export default UserStore;
