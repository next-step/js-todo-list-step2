export const isValidContents = (contents) => {
  if (typeof contents !== 'string') return false;
  if (contents.trim() === '') return false;
  return true;
};
