import { fetchAPI, METHOD } from './index';

// todos 조회
export const getTodos = (userId) => fetchAPI(`${userId}/items`);

// todo 추가
export const addTodo = (userId, contents) =>
  fetchAPI(`${userId}/items/`, METHOD.POST, { contents });

// todo 업데이트
export const updateTodo = (userId, itemId, contents) =>
  fetchAPI(`${userId}/items/${itemId}`, METHOD.PUT, { contents });

// todo 삭제
export const deleteTodo = (userId, itemId) =>
  fetchAPI(`${userId}/items/${itemId}`, METHOD.DELETE);

// todos 전부 삭제
export const deleteAllTodos = (userId) =>
  fetchAPI(`${userId}/items/`, METHOD.DELETE);

// todo 토글
export const toggleTodo = (userId, itemId) =>
  fetchAPI(`${userId}/items/${itemId}/toggle`, METHOD.PUT);

// todo 우선순위 수정('NONE', 'FIRST', 'SECOND')
export const setPriorityTodo = (userId, itemId, priority) =>
  fetchAPI(`${userId}/items/${itemId}/priority`, METHOD.PUT, { priority });
