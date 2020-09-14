export const convert2Html = (str) => {
  const $div = document.createElement('div');
  $div.innerHTML = str;
  return $div.children[0];
};

export const createFetchOption = (method, payload) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };
};
