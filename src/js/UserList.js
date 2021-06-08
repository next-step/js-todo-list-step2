
export default function UserList({onSelect, onAdd, onDelete}) {
  this.$userList = document.querySelector('#user-list');
  
  this.$state = {};
  
  this.setState = (newState) => {
    this.$state = newState;
    this.render();
  }

  this.render = () => {
    this.$userList.insertAdjacentHTML('beforeend',this.template());
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
    
    this.onSelectHander();
    this.onAddUserHandler();
    this.onDeleteUserHandler();
  } 

  this.onSelectHander = () => {
    const $userListBtn = document.querySelectorAll('.ripple');
    
    [...$userListBtn].map(btn => btn.addEventListener('click', event => {
    if (!event.target.matches('.ripple')) return;
    if (!event.target.hasAttribute('id')) return;
    
    const selectedId = event.target.id;
    onSelect(selectedId);
    }))
  }

  this.onAddUserHandler = () => {
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

  this.onDeleteUserHandler = () => {
    const $userDeleteBtn = document.querySelector('.user-delete-button');
    
    $userDeleteBtn.addEventListener('click', () => {
      onDelete();
    })

  }
}