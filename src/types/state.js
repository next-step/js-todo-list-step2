import { FILTER_STATUS, PRORITY_TYPE } from 'utils';

/**
 * @typedef {Object} AppStateInit
 * @property {boolean} isUsersLoading
 * @property {Todo[]} todoList
 * @property {UserType || null} user
 * @property {UserType[] || []} users
 * @property {string} editingId
 * @property {FILTER_STATUS} mode
 * @property {Error || null} error
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
  if (!new.target) return new User({ name });

  this.name = name || 'randomUser';
  this.todoList = [];
}
