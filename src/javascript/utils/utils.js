function setLastSelectedUser(userId) {
  localStorage.setItem('lastSelectedUser', userId);
}

function getLastSelectedUser() {
  return localStorage.getItem('lastSelectedUser');
}

function refresh() {
  setLastSelectedUser('');
  window.location.reload();
}

export { setLastSelectedUser, getLastSelectedUser, refresh };
