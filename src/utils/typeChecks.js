const isString = v => typeof v === 'string';
const isArray = v => Array.isArray(v);
const isObject = v => typeof v === 'object';
const isPlainObject = v =>
  isObject(v) && !isArray() && Object.getPrototypeOf(v) === Object.prototype;

export default { isString, isArray, isObject, isPlainObject };
