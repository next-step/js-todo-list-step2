import { FILTER_STATUS, PRORITY_TYPE } from './constants.js';

/**
 * @typedef {Object} IState
 * @property {boolean} isLoading
 * @property {UserType || null} user
 * @property {UserType[] || []} users
 * @property {Error || null} error
 * @property {FILTER_STATUS} defaultMode
 */

/**
 * @typedef {Object} UserType
 * @property {string} _id
 * @property {string} name
 * @property {TodoType[]} todoList
 * @param {FILTER_STATUS} mode
 * @property {string} editingId
 */

/**
 * @typedef {Object} TodoType
 * @property {string} id
 * @property {string} content
 * @property {boolean} completed
 * @property {PRORITY_TYPE} priority
 */

/**
 * @class generates Todos
 * @param {string} content
 * @returns {TodoType}
 */
export function Todo(contents) {
  if (!new.target) return new Todo(contents);

  this.contents = contents;
  this.isCompleted = false;
  this.priority = 'NONE';
  this._createdAt = new Date().toISOString();
  this._updatedAt = new Date().toISOString();
}

export function User({ name }) {
  if (!new.target) return new Todo(contents);

  this.name = name || 'randomUser';
  this.todoList = [];
}

/**
 * @param {IState} initialState
 */
export function AppState({
  isUsersLoading,
  todoList,
  user,
  users,
  editingId,
  mode = FILTER_STATUS.ALL,
  error = null,
}) {
  if (!new.target) return new AppState({ isLoading, user, users, mode });

  this.isUsersLoading = isUsersLoading;
  this.user = user;
  this.todoList = todoList;
  this.users = users;
  this.mode = mode;
  this.error = error;
  this.editingId = editingId;
}
