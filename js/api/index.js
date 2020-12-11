const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users";

const $api = (() => {
  const requestWithJsonData = (uri, config) =>
    fetch(uri, config).then((data) => data.json());

  const user = {
    getAll() {
      return requestWithJsonData(BASE_URL);
    },
  };

  return {
    user,
  };
})();

export default $api;
