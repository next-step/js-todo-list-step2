export const hasName = (name, list) => {
  return Object.keys(list).includes(name);
}

export const validLength = (value) => {
  return value.length > 1;
}