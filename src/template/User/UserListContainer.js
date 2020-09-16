import UserList from './UserList.js';

const UserListContainer = ({}) => {

  return `
    <section>
      <div>
        ${UserList({})}
        <button class="ripple user-create-button">+ 유저 생성</button>
      </div>
    </section>
    `;
};

export default UserListContainer;