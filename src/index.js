'use strict';

import { userListController } from './controller/userListController.js';
import { todoInputController } from './controller/todoInputController.js';
import { todoListController } from './controller/todoListController.js';
import { todoFilterController } from './controller/todoFilterController.js';

userListController.init();
todoInputController.init(); // 이런식으로라도 사용을 안해주면 객체가 생성이 안되는 듯...??
todoListController.init();
todoFilterController.init();
