const ROOT = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const postUser = (userName) => {
  const requestBody = JSON.stringify({
    name: userName,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };
  return fetch(`${ROOT}/api/users`, options)
    .then((res) => {
      if (!res.ok) return new Error(res.status);
      return res.json();
    })
    .then((post) => {
      return {
        _id: post._id,
        name: post.name,
      };
    });
};
