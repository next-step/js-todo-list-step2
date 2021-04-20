export const postData = (url = '', data = {}) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());

export const getData = (url = '') =>
  fetch(url).then((response) => response.json());

export const deleteData = (url = '') =>
  fetch(url, {
    method: 'DELETE',
  }).then((response) => response.json());
