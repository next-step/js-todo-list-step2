import { CURRENT_USER } from '../constant/user.js';

export const setCurrentUser = (currentUser) => {
  localStorage.setItem(CURRENT_USER, currentUser);
};

export const getCurrentUser = () => {
  return localStorage.getItem(CURRENT_USER) ?? '';
};
