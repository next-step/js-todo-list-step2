const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");

  if(userName.length < 2) {
    alert("유저 이름은 2글자 이상이어야 합니다.");
    return;
  }

  const userList = document.querySelectorAll('#user-list button');
  for (let user of userList) {
    if(user.classList.contains('active')) user.classList.remove('active');
  }
  
  const newUser = document.createElement('button');
  newUser.textContent = userName;
  newUser.classList.add('ripple','active');
  userList[0].before(newUser);  
}

const onUserDeleteHandler = () => {
  const userList = document.querySelectorAll('#user-list button');
  for (let user of userList) {
    if(user.classList.contains('active')) {
      if(confirm(user.innerHTML + "을(를) 삭제하시겠습니까?")) {
        user.parentNode.removeChild(user);
        userList[1].classList.add('active');
        return;
      }
    }
  }
  
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

const userDeleteButton = document.querySelector('.user-delete-button')
userDeleteButton.addEventListener('click', onUserDeleteHandler)
