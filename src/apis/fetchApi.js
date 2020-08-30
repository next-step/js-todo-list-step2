const fetchApi = (() => {
  const run = async (url, option) => {
    option = option || {};
    option.headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url, option);

    if (!response.ok) {
      const json = await response.json();
      throw Error(json.message);
    }

    return await response.json();
  };

  return {
    get: async (url) => {
      return await run(url);
    },
    post: async (url, body) => {
      const option = {
        method: "POST",
        body,
      };

      return await run(url, option);
    },
    put: async (url, body) => {
      const option = {
        method: "PUT",
        body,
      };

      return await run(url, option);
    },
    delete: async (url) => {
      const option = {
        method: "DELETE",
      };

      return await run(url, option);
    },
  };
})();

export default fetchApi;
