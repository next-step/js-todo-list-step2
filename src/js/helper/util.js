export const isEmptyObject = (obj) =>
  obj && Object.keys(obj).length === 0 && obj.constructor === Object;
