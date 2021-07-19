import { EVENT } from "../../const/COMMON.js";
import { ALERT, CLASS_NAME } from "../../const/TODO.js";
import { $ } from "../../utils/element.js";

class TodoInput {
  constructor({ add }) {
    this._add = add;
    this.$todoInput = $(CLASS_NAME.TODO_INPUT);
    this.setEvent();
  }

  event = {
    [EVENT.ENTER]: target => this.add(target.value),
    [EVENT.ESCAPE]: () => this.reset(),
  }

  onKeyup({ key, target }) {
    this.event[key] && this.event[key](target)
  }

  setEvent() {
    this.$todoInput.addEventListener('keyup', this.onKeyup.bind(this))
  }

  reset() {
    this.$todoInput.value = '';
  }

  isValid(contents) {

    const MIN_SIZE = 2;
    
    if (contents.length < MIN_SIZE) {
      alert(ALERT.PLZ_CHECK_MIN_SIZE);
      return false;
    }
    return true;
  }

  add(contents) {
    if (this.isValid(contents)) {
      this._add(contents);
      this.reset();
    }
  }
}

export default function(event) {
  return new TodoInput(event);
}