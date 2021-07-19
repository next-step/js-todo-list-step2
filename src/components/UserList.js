/* @jsx createElement */
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { getTodos } from '../modules/todos/';
import { getUser } from '../modules/user/';

const UserList = () => {
  const {
    user: { users },
  } = useSelector();

  const handleClick = (id) => {
    store.dispatch(getTodos(id));
    store.dispatch(getUser(id));
  };

  return (
    <div>
      <h1 id="user-title" data-username="eastjun">
        <span>
          <strong>eastjun</strong>'s Todo List
        </span>
      </h1>
      <section>
        <div id="user-list">
          {users.map((user) => (
            <button className="ripple" onclick={() => handleClick(user._id)}>
              {user.name}
            </button>
          ))}
          {/* <button class="ripple active">makerjun</button>
          <button class="ripple">eastjun</button> */}
          <button
            className="ripple user-create-button"
            data-action="createUser"
          >
            + 유저 생성
          </button>
          <button
            className="ripple user-delete-button"
            data-action="deleteUser"
          >
            삭제 -
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserList;
