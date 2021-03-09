export const CURRENT_USER = 'currentUser';

export const setCurrentUser = (currentUser) => {
    localStorage.setItem(CURRENT_USER, currentUser);
  };
  
  export const getCurrentUser = () => {
    return localStorage.getItem(CURRENT_USER) ?? '';
  };
  