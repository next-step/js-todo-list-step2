const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

  const $newUser = document.createElement('button');
  $newUser.className = 'ripple'
  $newUser.innerText = userName;

  const userCreateButton = document.querySelector('button.user-create-button');
  userCreateButton.insertAdjacentElement('beforebegin', $newUser);
}

const userCreateButton = document.querySelector('.user-create-button');
userCreateButton.addEventListener('click', onUserCreateHandler);