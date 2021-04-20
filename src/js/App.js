import { getData, postData } from './helper/FetchApi.js';
import { GET_USER_LIST_URL, POST_USER_URL } from './Config/API_URL.js';

import { setSelectedUser, setUserList } from './Store.js';

import UserList from './Components/UserList.js';

function App() {
  const onUserListLoadHandler = () =>
    getData(GET_USER_LIST_URL).then((data) => setUserList(data));

  const onUserCreateHandler = (userName) =>
    postData(POST_USER_URL, { name: userName }).then((data) => {
      setSelectedUser(data);
      return onUserListLoadHandler();
    });

  new UserList({ onCreate: onUserCreateHandler });

  const init = () => {
    onUserListLoadHandler();
  };

  init();
}

export default App;
