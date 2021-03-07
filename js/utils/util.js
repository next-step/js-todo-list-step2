export const equalToById = (id, targetId) => id === targetId;

export const notEqualToById = (id, targetId) => id !== targetId;

export const isEmpty = (title) => !title || /^\s*$/.test(title);
