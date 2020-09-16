import { getter } from '../../store/index.js';

const UserList = ({}) => {
  const userId = getter.userId();
  const userList = getter.userList();

  const btnStyle = (id) => userId === id ? 'active' : '';

  return `<div id="user-list"> 
            ${ userList.map((user) =>
            `<button data-index="${ user._id }" 
                            class="ripple ${ btnStyle(user._id) }">
                            ${ user.name }
            </button>`).join('') }
         </div>`;
};

export default UserList;