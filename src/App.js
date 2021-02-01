import UserItem from './components/UserItem.js';
import UserList from './components/UserList.js';
import usersStore, { GET_USERS } from './modules/users.js';

const App = async () => {
  await usersStore.dispatch({ type: GET_USERS });
  UserList();
};

export default App;
