import UserList from './UserList.js';

const UserListContainer = ({}) => {

  return `
    <section>
      <div id="user-list">
        ${UserList({})}
        <button class="ripple user-create-button">+ 유저 생성</button>
      </div>
    </section>
    `;
};

export default UserListContainer;