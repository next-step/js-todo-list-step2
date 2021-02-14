const CURRENT_USER = 'currentUser';

export const setCurrentUser = (currentUser) => {
    localStorage.setItem(CURRENT_USER, currentUser);
    // console.log(localStorage.getItem(CURRENT_USER));
};

export const getCurrentUser = () => {
    return localStorage.getItem(CURRENT_USER);
};