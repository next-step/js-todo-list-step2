function userItemTemplate(user){
  return`
    <button class="ripple" data-id=${user.id}>${user.name}</button>
  `
}

function UserList(loadUsers){
  const userList = document.querySelector('#user-list')
  userList.innerHTML = loadUsers.map(user => userItemTemplate(user)).join('')
}

export default UserList