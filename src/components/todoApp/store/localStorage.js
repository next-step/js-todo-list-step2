'use strict';

// export const CURRENT_USER = 'currentUser';

// export const setCurrentUser = currentUser => {
//   localStorage.setItem(CURRENT_USER, currentUser);
// };

// export const getCurrentUser = () => {
//   return localStorage.getItem(CURRENT_USER) ?? '';
// };

const LOCALSTORAGE_KEY = 'todoItems';

class TodoLocalStorage {
  saveItems(items) {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(items));
  }

  loadItems() {
    const loadedTodoItems = localStorage.getItem(LOCALSTORAGE_KEY);
    if (loadedTodoItems == 'undefined') return []; // 임시 에러 처리
    const parsedTodoItems = JSON.parse(loadedTodoItems);
    if (!parsedTodoItems) return [];
    return parsedTodoItems;
  }
}

export const todoLocalStorage = new TodoLocalStorage();
