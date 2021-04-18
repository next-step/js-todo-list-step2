export const ERROR_TYPE = {
  NO_USER: 'NO_USER',
  NO_TODO: 'NO_TODO',
  SERVER_ERROR: 'SERVER_ERROR',
  NOT_VALIDATE_USERNAME: 'NOT_VALIDATE_USERNAME',
  NOT_VALIDATE_TODO: 'NOT_VALIDATE_TODO',
  NOT_VALIDATE_TODOLIST: 'NOT_VALIDATE_TODOLIST',
};

export const ERROR_TYPE_BY_MESSAGE = {
  '해당 이름의 user가 없습니다.': ERROR_TYPE.NO_USER,
  '해당 이름의 유저가 없습니다.': ERROR_TYPE.NO_USER,
  'Todo Item을 수정하는데 에러가 발생했습니다.': ERROR_TYPE.NO_TODO,
};

export const ERROR_HANDLER = {
  NO_USER: () => {
    alert('존재하지 않는 유저입니다.');
    return location.reload();
  },
  NO_TODO: () => alert('존재하지 않는 항목입니다.'),
  SERVER_ERROR: () => {
    alert('잠시후 다시 시도해주세요');
    return location.reload();
  },
  NOT_VALIDATE_USERNAME: () => alert('이름은 2글자 이상이어야 합니다'),
  NOT_VALIDATE_TODO: () => alert('2글자 이상 입력해주세요'),
  NOT_VALIDATE_TODOLIST: () => alert('삭제할 항목이 없습니다'),
};
