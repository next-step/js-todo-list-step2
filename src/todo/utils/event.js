import Api from "../api/index.js";
import { TodoStore } from "../stores/index.js";
import { changeUserData } from "../utils/validator.js";

class Event {
  static changeActiveUser = ({ activeUser }) => {
    TodoStore.changeActiveUser({ activeUser });
  };

  static addUser = async () => {
    const name = prompt("추가하고 싶은 이름을 입력해주세요.");
    if (name && name.length >= 2) {
      const { message, ...rest } = await Api.addUser(name);
      if (!message && rest) {
        const renewUserList = await Api.requestUser();
        TodoStore.renewUserList({
          activeUser: rest._id,
          userList: renewUserList
        });
      }
    } else {
      alert("이름은 2글자 이상 입력해주세요.");
    }
  };

  static deleteUser = async id => {
    const { message } = await Api.removeUser(id);
    const renewUserList = await Api.requestUser();
    TodoStore.renewUserList({
      activeUser: renewUserList[0]._id,
      userList: renewUserList
    });
  };

  static addTodo = async ({ _id, contents }) => {
    const { message, ...rest } = await Api.addTodo(_id, contents);
    if (!message && rest) {
      const renewPersonalUser = await Api.requestPersonalUser(_id);
      const { userList } = TodoStore.getStore;
      const renewUserList = changeUserData(_id, userList, renewPersonalUser);

      TodoStore.setState({
        ...TodoStore.getStore,
        todos: renewPersonalUser,
        userList: renewUserList
      });
    }
  };

  static toggleCompleted = async ({ _id, itemId }) => {
    const { message, ...rest } = await Api.toggleTodo(_id, itemId);
    if (!message && rest) {
      const renewPersonalUser = await Api.requestPersonalUser(_id);
      const { userList } = TodoStore.getStore;
      const renewUserList = changeUserData(_id, userList, renewPersonalUser);

      TodoStore.setState({
        ...TodoStore.getStore,
        todos: renewPersonalUser,
        userList: renewUserList
      });
    }
  };

  static editingTodo = async ({ itemId, type }) => {
    const { todos } = TodoStore.getStore;
    const newTodos = todos.map(todo => {
      if (todo._id === itemId) todo.isEditing = type;
      return todo;
    });

    TodoStore.setState({
      ...TodoStore.getStore,
      todos: newTodos
    });
  };

  static saveEditContents = async ({ _id, itemId, contents }) => {
    const { message, ...rest } = await Api.editContents(_id, itemId, contents);

    if (!message && rest) {
      const renewPersonalUser = await Api.requestPersonalUser(_id);
      const { userList } = TodoStore.getStore;
      const renewUserList = changeUserData(_id, userList, renewPersonalUser);

      TodoStore.setState({
        ...TodoStore.getStore,
        todos: renewPersonalUser,
        userList: renewUserList
      });
    }
  };

  static editPriority = async ({ _id, itemId, priority }) => {
    const { message, ...rest } = await Api.editPriority(_id, itemId, priority);
    if (!message && rest) {
      const renewPersonalUser = await Api.requestPersonalUser(_id);
      const { userList } = TodoStore.getStore;
      const renewUserList = changeUserData(_id, userList, renewPersonalUser);

      TodoStore.setState({
        ...TodoStore.getStore,
        todos: renewPersonalUser,
        userList: renewUserList
      });
    }
  };

  static deleteTodo = async ({ _id, itemId }) => {
    const { message, ...rest } = await Api.deleteTodo(_id, itemId);
    if (!message && rest) {
      const renewPersonalUser = await Api.requestPersonalUser(_id);
      const { userList } = TodoStore.getStore;
      const renewUserList = changeUserData(_id, userList, renewPersonalUser);

      TodoStore.setState({
        ...TodoStore.getStore,
        todos: renewPersonalUser,
        userList: renewUserList
      });
    }
  };
}

export default Event;
