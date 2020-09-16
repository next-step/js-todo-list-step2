import { loadingRender } from './render.js';

export const validateUserName = async (name, caller) => {
  if (name.length > 1)
    return true;

  alert('User 의 이름은 최소 2글자 이상이어야 합니다.');
  await caller(validateUserName);
};

export const loadingWrapper = async (handler) => {
  loadingRender(true);
  await handler();
  loadingRender(false);
};