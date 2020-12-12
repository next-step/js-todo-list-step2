export const message = {
  userLength: '2글자 이상 입력하셔야 합니다!',
  failLoadUser: 'user를 불러오는데 실패했습니다😥',
  failAddUser: 'user 입력이 실패하였습니다😥',
  failDeleteUser: 'user 삭제가 실패하였습니다😥',

  failDeleteToDo: 'todo 삭제가 실패하였습니다😥',
  failDeleteToDoAll: '모든 todo 삭제가 실패하였습니다😥',
  failAddToDo: 'todo 입력이 실패하였습니다😥',
  failLoadToDos: 'todoList를 불러오는데 실패했습니다😥',
  failToggleUser: 'todo의 상태변화가 실패하였습니다😥',
  failEditUser: 'todo 수정이 실패하였습니다😥',
  failPriorityUser: 'todo의 우선순위 설정이 실패하였습니다😥',

  error: (error) => {
    return `[ ${error} ] : \n에러가 발생하였습니다.`;
  },
};
