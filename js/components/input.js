import Component from '../lib/component.js';
import store from '../store/index.js';
import { message } from '../message/message.js';

const Input = class extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.new-todo'),
    });
  }

  addToDo = (e) => {
    //엔터 키에만 수행, 공백제거
    if (e.key !== 'Enter' || e.target.value.replace(/(\s*)/g, '') === '') {
      return;
    }
    //두글자 이상
    if (e.target.value.length < 2) {
      alert(message.userLength);
      return;
    }

    const text = e.target.value;
    store.dispatch('addToDo', { contents: text });
    //입력시엔 할 일들을 보두 보여줌
    store.dispatch('setFilterType', 'all');
    e.target.value = '';
    e.target.focus();
  };

  setEvent(target) {
    target.addEventListener('keyup', (e) => {
      this.addToDo(e);
    });
  }
};
export default Input;
