function hasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function setLastSelectedUser(userId) {
  localStorage.setItem('lastSelectedUser', userId);
}

function getLastSelectedUser() {
  return localStorage.getItem('lastSelectedUser');
}

export { hasKey, setLastSelectedUser, getLastSelectedUser };
