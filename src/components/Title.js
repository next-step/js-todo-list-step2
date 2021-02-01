import selectedUserStore, { GET_USER } from '../modules/selectedUser.js';

const Title = () => {
  const $title = document.querySelector('h1#user-title');
  const $userName = $title.querySelector('strong');

  const render = () => {
    const { name } = selectedUserStore.getState();
    $title.dataset.username = name;
    $userName.innerHTML = name;
  };

  selectedUserStore.subscribe(GET_USER, render);
};

export default Title;
