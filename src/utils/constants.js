/**
 * @readonly
 * @enum {string}
 */
const FILTER_NAMES = new Map([
  ['all', '전체보기'],
  ['active', '남은 투두'],
  ['completed', '완료한 투두'],
]);

/**
 * @readonly
 * @enum {"all" | "active" | "completed"}
 */
const FILTER_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

const PRORITY_TYPE = {
  NONE: 'NONE',
  FIRST: 'FIRST',
  SECOND: 'SECOND',
};

const PRIORITY_ENUM = new Map([
  ['NONE', 0],
  ['FIRST', 1],
  ['SECOND', 2],
  [0, 'NONE'],
  [1, 'FIRST'],
  [2, 'SECOND'],
]);

const PRIORITY_CLASS = new Map([
  ['NONE', ''],
  ['FIRST', 'primary'],
  ['SECOND', 'secondary'],
]);

const MESSAGES = {
  WELCOME: '🙌 WELCOME 🙌',
  ASK_NAME: 'please insert name',
  NAME_POLICY_NOTICE: 'username should be longer than 2 character',
  CONFIRM_DELETE: 'Wanna destory this?',
  CONFIRM_DELETE_ALL: '😈 Wanna delete every todos?',
};

export {
  FILTER_NAMES,
  FILTER_STATUS,
  PRIORITY_CLASS,
  PRIORITY_ENUM,
  PRORITY_TYPE,
  MESSAGES,
};
