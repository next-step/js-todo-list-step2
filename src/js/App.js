import { getData, postData, deleteData } from './Helper/FetchApi.js';
import {
  GET_USER_LIST_URL,
  POST_USER_URL,
  DELETE_USER_URL,
  POST_TODO_URL,
  GET_USER_URL,
} from './Config/API_URL.js';

import { getSelectedUserId, setSelectedUser, setUserList } from './Store.js';

import UserList from './Components/UserList.js';
import UserTitle from './Components/UserTitle.js';
import TodoList from './Components/TodoList.js';
import TodoInput from './Components/TodoInput.js';

const App = () => {
  const onUserListLoadHandler = (selectedUser = {}) => {
    const fetchURL = GET_USER_LIST_URL();

    return getData(fetchURL).then((data) => {
      setUserList(data, selectedUser);
    });
  };

  const onUserCreateHandler = (userName) => {
    const fetchURL = POST_USER_URL();

    return postData(fetchURL, { name: userName }).then((data) => {
      return onUserListLoadHandler(data);
    });
  };

  const onUserChangeHandler = (selectedUser) => {
    return onUserListLoadHandler(selectedUser);
  };

  const onUserDeleteHandler = (userId) => {
    const fetchURL = DELETE_USER_URL(userId);

    return deleteData(fetchURL).then((data) => {
      return onUserListLoadHandler();
    });
  };

  const onUserLoadHandler = () => {
    const selectedUserId = getSelectedUserId();
    const fetchURL = GET_USER_URL(selectedUserId);

    return getData(fetchURL).then((data) => {
      return setSelectedUser(data);
    });
  };

  const onTodoCreateHandler = (todo) => {
    const selectedUserId = getSelectedUserId();
    const fetchURL = POST_TODO_URL(selectedUserId);

    return postData(fetchURL, { contents: todo }).then((data) => {
      return onUserLoadHandler();
    });
  };

  const init = () => {
    UserTitle();
    UserList({
      onCreate: onUserCreateHandler,
      onChange: onUserChangeHandler,
      onDelete: onUserDeleteHandler,
    });
    TodoList();
    TodoInput({
      onAdd: onTodoCreateHandler,
    });

    onUserListLoadHandler();
  };

  init();
};

export default App;
