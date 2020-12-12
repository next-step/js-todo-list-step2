import Component from '../../lib/component.js';
import store from '../../store/index.js';
import { validateInput } from '../../common/validate.js';

const Input = class extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.new-todo'),
    });
  }

  addToDo = (e) => {
    //엔터 키에만 수행, 공백제거
    if (e.key !== 'Enter' || !validateInput(e.target.value)) {
      return;
    }

    const text = e.target.value;
    store.dispatch('addToDo', { contents: text });
    //입력시엔 할 일들을 보두 보여줌
    store.dispatch('setFilterType', 'all');
    e.target.value = '';
    e.target.focus();
  };

  render() {
    //user불러오기 실패시 입력 창 비활성화
    if (!store.state.selectedUser) {
      this.element.setAttribute('disabled', 'true');
      this.element.setAttribute('placeholder','');
    }else{
      this.element.removeAttribute('disabled');
      this.element.setAttribute('placeholder','할 일을 입력해주세요.');
      this.element.focus();
    }
  }

  setEvent(target) {
    target.addEventListener('keyup', (e) => {
      this.addToDo(e);
    });
  }
};
export default Input;
