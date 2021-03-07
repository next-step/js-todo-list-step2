'use strict';

export const FILTER_TYPE = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
});

export const PRIORITY_TYPE = Object.freeze({
  1: 'FIRST',
  2: 'SECOND',
  0: 'NONE',
});

export const PRIORITY_CLASSLIST = Object.freeze({
  FIRST: 'primary',
  SECOND: 'secondary',
  NONE: '',
});

export const MINIMUM_USER_NAME_LENGTH = 2;
