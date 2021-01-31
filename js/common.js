export const serverURL = "https://js-todo-list-9ca3a.df.r.appspot.com";
/** structure of todo elements in server.
 * - 'name': string. name of user.
 * - 'todoList': array. list of todos.
 *   - '_id': string. id of todo.
 *   - 'contents': string. text of todo.
 *   - 'priority': string. priority of todo. it has 'NONE', 'FIRST', 'SECOND'
 *   - 'isCompleted': string. status of todo.
 * - '_id': string. id of user.
 */

// 할 일이 몇 개 있는지 출력하는 텍스트(총 n 개)를 업데이트하는 로직.
export function updateCountText() {
  const todoListCountText = document.querySelector(".todo-count > strong");
  const selectedFilter = document.querySelector(
    'ul.filters li a[class*="selected"]'
  );
  const allTodos = document.querySelectorAll("ul.todo-list li");
  const completedTodos = document.querySelectorAll("ul.todo-list li.completed");

  if (selectedFilter.classList.contains("all")) {
    todoListCountText.innerText = allTodos.length;
  } else if (selectedFilter.classList.contains("active")) {
    todoListCountText.innerText = allTodos.length - completedTodos.length;
  } else if (selectedFilter.classList.contains("completed")) {
    todoListCountText.innerText = completedTodos.length;
  }
}
