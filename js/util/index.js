export const createFetchOption = (method, payload) => {
  const option = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  if (!payload) option.body = '';
  return option;
};
