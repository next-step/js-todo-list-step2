import { BASE_URL } from "../constant/url.js";

const requests = {
  get: (path) => fetch(BASE_URL + path).then((data) => data.json()),
  post: (path, option) =>
    fetch(BASE_URL + path, option)
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.statusText);
        }
        return data.json();
      })
      .catch((e) => {
        alert(e);
      }),
  delete: (path) => fetch(BASE_URL + path),
};

export default requests;
