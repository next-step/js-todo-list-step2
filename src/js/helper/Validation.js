export const isValidUserName = (name) => {
  const trimmedName = name.trim();
  return trimmedName.length >= 2;
};
