'use strict';

import { $ } from '../../../utils/dom.js';

class UserTitleView {
  constructor() {
    this.$userTitle = $('#user-title');
  }

  render(userName) {
    this.$userTitle.innerHTML = userTitleTemplate(userName);
  }

  userTitleTemplate(userName) {
    return `
		<span>
			<strong>${userName}</strong>'s Todo List
		</span>
	`;
  }
}

export const userTitleView = new UserTitleView();
