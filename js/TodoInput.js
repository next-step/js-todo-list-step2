import {KEY} from './constants.js';
import {isEmptyOrWhitespace} from './validation.js';

export default function TodoInput($todoInput, addItem) {
  this.$todoInput = $todoInput;
  this.$todoInput.addEventListener('keyup', (e) => {
    e.stopPropagation();
    if (e.key === KEY.ENTER) {
      if (isEmptyOrWhitespace(this.$todoInput.value)) {
        alert('할일을 입력하세요!');
        return;
      }

      addItem(this.$todoInput.value);

      this.$todoInput.value = '';
    }
  });
}
