/**
 * @namespace
 */
const LocalStorage = {
  fetchTodos() {
    return JSON.parse(localStorage.getItem(`todos`));
  },
  setTodos(todos) {
    return localStorage.setItem(`todos`, JSON.stringify(todos));
  },
  clearTodos() {
    return localStorage.deleteItem(`todos`);
  },
};

export default LocalStorage;
