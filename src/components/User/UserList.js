const UserList = ({ users }) => {
  return `
    <section>
      <div id="user-list">
        <button class="ripple active">eastjun</button>
        <button class="ripple">westjun</button>
        <button class="ripple">southjun</button>
        <button class="ripple">northjun</button>
        <button class="ripple">hojun</button>
        <button class="ripple user-create-button">+ 유저 생성</button>
      </div>
    </section>
    `;
};

export default UserList;