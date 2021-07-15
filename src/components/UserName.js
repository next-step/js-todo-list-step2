function UserName(name) {
  if (name === '') return;
  const userName = document.querySelector('#user-title strong');
  userName.textContent = name;
}
export default UserName;
