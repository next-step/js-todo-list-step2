import { MINIMUM_LENGTH } from "./constant.js";

const INFORM_MESSAGES = {
  ADD_USER: "추가하고 싶은 이름을 입력해주세요.",
};

const ERROR_MESSAGES = {
  TOO_SHORT_USER_NAME: `최소 ${MINIMUM_LENGTH.USER_NAME}글자 이상이어야 합니다.`,
  TOO_SHORT_ITEM_CONTENTS: `최소 ${MINIMUM_LENGTH.ITEM_CONTENTS}글자 이상이어야 합니다.`,
  ADD_USER: "사용자 추가에 실패했습니다.",
  DELETE_USER: "사용자 삭제에 실패했습니다.",
  GET_USER_LIST: "사용자의 리스트를 불러오는데 실패했습니다.",
  GET_TODO_LIST: "할 일 목록을 불러오는데 실패했습니다.",
  ADD_ITEM: "할 일 추가에 실패했습니다.",
  DELETE_ALL_ITEMS: "모두 삭제하기에 실패했습니다.",
  DELETE_ITEM: "할 일 삭제하기에 실패했습니다.",
  COMPLETE_ITEM: "할 일 완료에 실패했습니다.",
  EDIT_ITEM: "할 일 수정에 실패했습니다.",
  SET_PRIORITY: "우선순위 지정에 실패했습니다.",
};

export { INFORM_MESSAGES, ERROR_MESSAGES };
