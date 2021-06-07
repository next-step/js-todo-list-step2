
export default function UserList({onSelect, onAdd, onDelete}) {
  const $userList = document.querySelector('#user-list');
  
  let $state = {};
  
  this.setState = (newState) => {
    $state = newState;
    this.render();
  }

  this.render = () => {
    $userList.insertAdjacentHTML('beforeend',this.template());
    this.setEvent();
  }
  
  this.template = () => {
    return `
      <button class="ripple user-create-button" data-action="createUser">
        + 유저 생성
      </button>
      <button class="ripple user-delete-button" data-action="deleteUser">
        삭제 -
      </button>`;
  }
  this.setEvent = () => {
    
    this.addEvent1();
    this.addEvent2();
    this.addEvent3();
  } 


  this.addEvent1 = () => {
    const $userListBtn = document.querySelectorAll('.ripple');
    
    [...$userListBtn].map(btn => btn.addEventListener('click', event => {
    if (!event.target.matches('.ripple')) return;
    if (!event.target.hasAttribute('id')) return;
    
    const selectedId = event.target.id;
    onSelect(selectedId);
    }))
  }

  this.addEvent2 = () => {
    const $userCreateBtn = document.querySelector('.user-create-button');
    $userCreateBtn.addEventListener('click', () => {
        const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
        
        if (userName.length < 2) {
          alert('2글자 이상이어야 합니다.')
          return;
        }
        onAdd(userName);
    })
  }

  this.addEvent3 = () => {
    const $userDeleteBtn = document.querySelector('.user-delete-button');
    console.log($userDeleteBtn);
    
    $userDeleteBtn.addEventListener('click', () => {
      onDelete();
    })

  }
}