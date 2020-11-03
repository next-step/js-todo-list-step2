export const requestFetch = ({
  url,
  method = "GET",
  data,
  uri = "",
  params = ""
}) => {
  return fetch(`${url}${uri}${params}`, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => {
      throw new TypeError(`request faild ${err.message}`);
    })
    .then(res => res);
};
