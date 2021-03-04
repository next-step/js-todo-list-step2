'use strict';

// export const CURRENT_USER = 'currentUser';

// export const setCurrentUser = currentUser => {
//   localStorage.setItem(CURRENT_USER, currentUser);
// };

// export const getCurrentUser = () => {
//   return localStorage.getItem(CURRENT_USER) ?? '';
// };

class LocalStorage {
  saveItems() {
    localStorage.setItem('todoItems', JSON.stringify(this.todoItems));
  }

  loadItems() {
    const loadedTodoItems = localStorage.getItem('todoItems');
    const parsedTodoItems = JSON.parse(loadedTodoItems);
    if (!parsedTodoItems) return [];
    return parsedTodoItems;
  }
}
