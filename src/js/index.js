fetch('https://js-todo-list-9ca3a.df.r.appspot.com/api/users')
  .then(Response => {
    return Response.json();
  })
  .then(users => {
    users.forEach(user => {
      const userBtn = document.createElement('button');
      userBtn.setAttribute('class', 'ripple');
      userBtn.innerText = user.name;
      userCreateButton.before(userBtn);
    })
  })

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
  
  if (userName.length < 2) {
    alert('2글자 이상이어야 합니다.')
    return;
  }  
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)






