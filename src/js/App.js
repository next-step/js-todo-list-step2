import { getData, postData } from './helper/FetchApi.js';
import { GET_USER_LIST_URL, POST_USER_URL } from './Config/API_URL.js';

import { setUserList } from './Store.js';

import UserList from './Components/UserList.js';
import UserTitle from './Components/UserTitle.js';

function App() {
  const onUserListLoadHandler = (selectedUser = {}) =>
    getData(GET_USER_LIST_URL).then((data) => {
      setUserList(data, selectedUser);
    });

  const onUserCreateHandler = (userName) =>
    postData(POST_USER_URL, { name: userName }).then((data) => {
      return onUserListLoadHandler(data);
    });

  const onUserChangeHandler = (selectedUser) => {
    return onUserListLoadHandler(selectedUser);
  };

  new UserTitle();
  new UserList({
    onCreate: onUserCreateHandler,
    onChangeUser: onUserChangeHandler,
  });

  const init = () => {
    onUserListLoadHandler();
  };

  init();
}

export default App;
