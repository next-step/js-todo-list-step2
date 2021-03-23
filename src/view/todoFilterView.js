'use strict';

import { $, $$ } from '../utils/dom.js';

class TodoFitlerView {
  constructor() {
    this.$todoFilter = $('.filters');
    this.$count = $('.todo-count>strong');
  }

  changeSelectedBtn(filterType) {
    const $selectedBtn = $('.selected', this.$todoFilter);
    const $targetBtn = $(`.${filterType}`, this.$todoFilter);
    $selectedBtn.classList.remove('selected');
    $targetBtn.classList.add('selected');
  }

  showCount() {
    const count = $$('.todo-item').length;
    this.$count.innerText = count;
  }
}

export const todoFitlerView = new TodoFitlerView();
