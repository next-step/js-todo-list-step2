/**
 * @readonly
 * @enum {string}
 */
export const FILTER_NAMES = new Map([
  ['all', '전체보기'],
  ['active', '남은 투두'],
  ['completed', '완료한 투두'],
]);

/**
 * @readonly
 * @enum {"all" | "active" | "completed"}
 */
export const FILTER_STATUS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const PRORITY_TYPE = {
  NONE: 'NONE',
  FIRST: 'FIRST',
  SECOND: 'SECOND',
};

export const PRIORITY_ENUM = new Map([
  ['NONE', 0],
  ['FIRST', 1],
  ['SECOND', 2],
  [0, 'NONE'],
  [1, 'FIRST'],
  [2, 'SECOND'],
]);

export const PRIORITY_CLASS = new Map([
  ['NONE', ''],
  ['FIRST', 'primary'],
  ['SECOND', 'secondary'],
]);
