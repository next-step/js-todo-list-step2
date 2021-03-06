'use strict';

import { $, $$ } from '../../../utils/dom.js';

class TodoFitlerView {
  constructor() {
    this.$todoFilter = $('.filters');
    this.$count = $('.todo-count>strong');
  }

  changeSelectedBtn(target) {
    const selectedBtn = $('.selected', this.$todoFilter);
    selectedBtn.classList.remove('selected');
    target.classList.add('selected');
  }

  showCount() {
    const count = $$('.todo-item').length;
    this.$count.innerText = count;
  }
}

export const todoFitlerView = new TodoFitlerView();
