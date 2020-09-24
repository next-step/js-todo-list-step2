const ERROR = {
  NO_USER: '해당 이름의 user가 없습니다.',  // used: createUserTodoItem
  NO_USER2: '해당 user를 찾는데 에러가 발생했습니다.', // readUserTodoItems
  NO_USER3: '해당 유저가 존재하지 않습니다.', // updateUserTodoItemComplete, deleteUserItemService, putUserItemService, deleteUserItemsAllService, updateUserTodoItemPriority
  UPDATE_TODO_ITEM: 'Todo Item을 수정하는데 에러가 발생했습니다.', // updateUserTodoItemComplete, putUserItemService, updateUserTodoItemPriority
  DELETE_TODO_ITEM: 'Todo Item을 삭제하는데 에러가 발생했습니다.',// deleteUserItemService
};

const SUCCESS = {
  DELETE_TODO_ITEM_ALL: '해당 유저의 Todo Item 을 모두 삭제하였습니다.'
};

export { ERROR, SUCCESS };

