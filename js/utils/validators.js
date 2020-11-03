import { MINIMUM_USER_NAME_LENGTH } from '../constants/index.js';

export const isValidUserName = (name) =>
  name.length >= MINIMUM_USER_NAME_LENGTH;
