import { BASE_URL } from "../constant/url.js";

const requests = {
  get: (path) => fetch(BASE_URL + path).then((data) => data.json()),
  post: (path, bodyObj) =>
    fetch(BASE_URL + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj),
    })
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.statusText);
        }
        return data.json();
      })
      .catch((e) => {
        alert(e);
      }),
  delete: (path) =>
    fetch(BASE_URL + path, { mehtod: "DELETE" })
      .then((data) => {
        if (!data.ok) {
          throw new Error(data.statusText);
        }
        return data.json();
      })
      .catch((e) => {
        alert(e);
      }),
};

export default requests;
