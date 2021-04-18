export const ERROR_TYPE = {
  NO_USER: 'NO_USER',
  NO_TODO: 'NO_TODO',
  SERVER_ERROR: 'SERVER_ERROR',
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
  NO_TODO: () => {
    return alert('존재하지 않는 항목입니다.');
  },
  SERVER_ERROR: () => {
    alert('잠시후 다시 시도해주세요');
    return location.reload();
  },
};
