export const equalToById = (id, targetId) => parseInt(id) === parseInt(targetId);

export const isEmpty = (title) => !title || /^\s*$/.test(title);
