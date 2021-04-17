import { $ } from './querySelector.js';

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

function setLoadingBar() {
  const li = `<li class="loading">
  <div class="view">
    <label class="label">
      <div class="animated-background">
        <div class="skel-mask-container">
          <div class="skel-mask"></div>
        </div>
      </div>
    </label>
  </div>
  </li>`;
  $('.todo-list').insertAdjacentHTML('afterBegin', li);
}

function deleteLoadingBar() {
  $('.loading')?.remove();
}

export {
  setLastSelectedUser,
  getLastSelectedUser,
  refresh,
  setLoadingBar,
  deleteLoadingBar,
};
