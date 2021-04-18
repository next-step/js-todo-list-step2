export const isAvailableUser = (userId) => {
  if (!userId) throw '선택된 유저가 없습니다';
};

export const isAvailableUserName = (userName) => {
  if (userName.length < 2) throw '이름은 2글자 이상이어야 합니다';
};

export const isAvaliableTodo = (todo) => {
  if (todo.length < 2) throw '2글자 이상 입력해주세요';
};

export const isRemovableList = (todoList) => {
  if (!todoList || todoList.length === 0) throw '삭제할 항목이 없습니다';
};
