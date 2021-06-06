import { UserTitle } from './UserTitle/index.js';
import { UserListContainer } from './UserListContainer/index.js';
import { UserList } from './UserList/index.js';
import { setUserCreateEvent } from '../event/AddEvent.js';
const Home = ($app) => {
  $app.append(UserTitle(), UserList(), UserListContainer());
  setUserCreateEvent();
};

export default Home;
