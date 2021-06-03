export const validName = (name, list) => {
  if (!name) {
    return false;
  }
  const trimmedName = name.trim();
  return !Object.keys(list).includes(trimmedName);
}