/* @jsx createElement */
import { store } from '../index.js';
import { createElement } from '../lib/React.js';
import { useSelector } from '../lib/Redux.js';
import { getTodos } from '../modules/todos/';
import { addUser, deleteUser, getUser } from '../modules/user/';

const UserList = () => {
  const {
    user: { users, user: selectedUser },
  } = useSelector();

  const userBtnClick = (id) => {
    store.dispatch(getTodos(id));
    store.dispatch(getUser(id));
  };

  const createUserClick = () => {
    const userName = prompt('추가하고 싶은 이름을 입력해주세요.')?.trim();
    if (userName?.length < 2)
      alert('User의 이름은 최소 2글자 이상이어야 합니다.');
    if (userName && userName.length >= 2) {
      store.dispatch(addUser(userName));
    }
  };

  const deleteUserClick = () => {
    if (!selectedUser) alert('유저를 생성해주세요!');
    const userName = confirm(`${selectedUser.name}을 삭제하시겠습니까?`);
    if (userName) {
      store.dispatch(deleteUser(selectedUser._id));
    }
  };

  return (
    <fragment>
      <h1 id="user-title" data-username="eastjun">
        <span>
          <strong>{selectedUser?.name}</strong>'s Todo List
        </span>
      </h1>
      <section>
        <div id="user-list">
          {users.map((user) => (
            <button
              className={`ripple ${
                user._id === selectedUser?._id ? 'active' : ''
              }`}
              // key={user_id}
              onclick={() => userBtnClick(user._id)}
            >
              {user.name}
            </button>
          ))}
          <button
            className="ripple user-create-button"
            data-action="createUser"
            onclick={createUserClick}
          >
            + 유저 생성
          </button>
          <button
            className="ripple user-delete-button"
            data-action="deleteUser"
            onclick={deleteUserClick}
          >
            삭제 -
          </button>
        </div>
      </section>
    </fragment>
  );
};

export default UserList;
