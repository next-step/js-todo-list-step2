import API from '../../api/index.js';
import UserList from './UserList.js';

export default async function Users() {
  try {
    const fetchItems = await API.getUserList;
    new UserList().setState(fetchItems);
    return fetchItems;
  } catch (error) {
    console.error(error);
    return [];
  }
}
