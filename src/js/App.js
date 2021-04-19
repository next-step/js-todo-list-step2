import { getData, postData } from './helper/FetchApi.js';
import { GET_USER_LIST_URL, POST_USER_URL } from './Config/API_URL.js';
import UserList from './Components/UserList.js';

function App() {
  this.store = [];
  this.setStore = (updatedData) => {
    this.store = updatedData;
    render();
  };

  const onUserListLoadHandler = () =>
    getData(GET_USER_LIST_URL).then((data) => this.setStore(data));

  const onUserCreateHandler = (userName) =>
    postData(POST_USER_URL, { name: userName }).then((data) =>
      this.setStore([...this.store, data])
    );

  const userList = new UserList({ onCreate: onUserCreateHandler });

  const init = () => {
    onUserListLoadHandler();
  };

  const render = () => {
    userList.render(this.store);
    console.log(this.store);
  };

  init();
}

export default App;
