export const requestFetch = ({
  baseUrl,
  method = "GET",
  data,
  uri = "",
  params = ""
}) => {
  return fetch(`${baseUrl}${uri}${params}`, {
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
