/**
 * 1. 유저생성 메서드 = addUser
 * 2. 유저삭제 메서드 = deleteUser
 * 3. 유저의 todoList 불러오기 메서드= getTodoList
 * 4. 유저의 todoList에 todoItem 추가하기= addItem
 * 5. 유저의 todoList에 todoItem 삭제하기= deleteItem
 * 6. 유저의 todoList에 todoItem 수정하기(완료|수정|우선순위)= updateItem
 *
 */

export const UserService = class {
  #todoRepository;
  #userList;
  #selectedUser;
  #subject;

  constructor(repository, subject) {
    if (repository) {
      this.#todoRepository = repository;
    }
    this.#subject = subject;
  }

  setup = async () => {
    await this.updateUserList();
  };

  updateUserList = async () => {
    this.#userList = await this.#todoRepository.findUsers();
    if (this.#userList.length > 0) {
      this.changeSelectedUser(this.#userList[0]);
    }
  };

  changeSelectedUser = (user) => {
    this.#selectedUser = user;
    this.#subject.notify();
  };
  changeSelectedUserById = (userId) => {
    let findUser = this.#userList.find((user) => user._id === userId);
    if (findUser) this.changeSelectedUser(findUser);
  };

  getSelectedUser = () => {
    return this.#selectedUser;
  };

  getUserList = () => {
    return this.#userList;
  };

  addUser = async (name) => {
    let savedUser = await this.#todoRepository.saveUser(name);
    this.#userList.push(savedUser);
    this.#selectedUser = savedUser;
    this.#subject.notify();
  };
  deleteUser = async (userId) => {
    return this.#todoRepository.deleteUser(userId);
  };
  getTodoList = async (userId) => {};

  addItem = async (contents) => {
    let todoItem = await this.#todoRepository.saveTodoItem(
      this.#selectedUser._id,
      contents
    );
    this.#selectedUser.todoList.push(todoItem);
    this.#subject.notify();
  };
  deleteItem = async (itemId) => {
    let todoList = this.#selectedUser.todoList;
    let findIndex = todoList.findIndex((item) => item._id === itemId);
    if (findIndex < 0) return;
    todoList.splice(findIndex, 1);
    await this.#todoRepository.deleteTodoItem(this.#selectedUser._id, itemId);
    this.#subject.notify();
  };

  updateItem = async (itemId, contents) => {
    let findItem = this.findTodoItem(itemId);
    findItem.contents = contents;
    await this.#todoRepository.modifyTodoItem(
      this.#selectedUser._id,
      itemId,
      contents
    );
    this.#subject.notify();
  };

  toggleItem = async (itemId) => {
    let { _id, todoList } = this.#selectedUser;
    let findItem = todoList.find((item) => item._id === itemId);
    findItem.isCompleted = !findItem.isCompleted;
    await this.#todoRepository.modifyTodoItemComplete(
      _id,
      itemId,
      findItem.isCompleted
    );
    this.#subject.notify();
  };

  updateItemPriority = async (itemId, priority) => {
    let decodedPriority = this.#decodePriority(priority);
    let findItem = this.findTodoItem(itemId);
    if (findItem.priority === decodedPriority) return;
    findItem.priority = decodedPriority;
    await this.#todoRepository.modifyTodoItemPriority(
      this.#selectedUser._id,
      itemId,
      decodedPriority
    );
    this.#subject.notify();
  };

  findTodoItem = (itemId) => {
    let todoList = this.#selectedUser.todoList;
    return todoList.find((item) => item._id === itemId);
  };

  #decodePriority(priority) {
    return priority === '0' ? 'NONE' : priority === '1' ? 'FIRST' : 'SECOND';
  }
};
