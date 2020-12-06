import Component from '../lib/component.js';
import store from '../store/index.js';

const User = class extends Component {
    constructor() {
    super({
        store,
        element: document.querySelector('#user-list')
    });
    }

    //버튼 핸들
    onUserClick = (e) => {
      switch(e.target.className){
        case("ripple user-create-button") : 
          const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
          break;
        case("ripple user-create-button") : 
          console.log('삭제버튼')
          break;
      }
    }

    render(){
        this.element.innerHTML = `
        ${store.state.userList.map((user, i) => `
          <button
            data-ref="select"
            data-index=""
            class="ripple ${(store.state.selectedUser=='' && i==0) ? 'active':''}">
            ${user.name}
          </button>
        `).join('')}
        <button data-ref="appender" class="ripple user-create-button">+ 유저 생성</button>
        <button data-ref="remover" class="ripple user-create-button">- 선택 삭제</button>
      `;
    }
  
    

    setEvent(target){
      target.addEventListener('click', e =>{
        this.onUserClick(e)
      })
    }
}
export default User;
