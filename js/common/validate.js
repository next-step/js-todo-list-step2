import { message } from './message.js';

//리턴 값이 제대로 들어왔나 체크
export const validateResult = (returnValue) => {
  return (
    returnValue !== undefined && returnValue !== null && returnValue !== ''
  );
};

//입력하는 값 공백제거 길이 체크
export const validateInput = (checkValue) => {
  const trimValue = checkValue.trim();
  if (trimValue.length < 2) {
    alert(message.userLength);
    return false;
  } else {
    return true;
  }
};
