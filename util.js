export const isValidContent = (content) => {
  if (typeof content === 'string' && content.trim()) {
    return true;
  }
  return false;
};

export const isArray = (items) => {
  return Array.isArray(items);
}