// core
import DOM from '../core/createElement.js';

// function component
const UserItem = ({ _id, name, isActive }) =>
  DOM.button({
    class: isActive ? 'ripple active' : 'ripple',
    dataUserId: _id,
    innerText: name,
  });

export default UserItem;
