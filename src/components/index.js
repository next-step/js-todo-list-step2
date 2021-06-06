import { UserTitle } from './UserTitle/index.js';
import { UserListContainer } from './UserListContainer/index.js';
import { UserList } from './UserList/index.js';
const Home = ($app) => {
  $app.append(UserTitle(), UserList(), UserListContainer());
};

export default Home;
