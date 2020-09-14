const UserTitle = ({ name }) => {
    return `
      <h1 id="user-title" data-username="eastjun">
        <span><strong>${name}</strong>'s Todo List</span>
      </h1>
  `;
};

export default UserTitle;