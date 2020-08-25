const fetchApi = async (url, option) => {
  try {
    const response = await fetch(url, option);
    if (!response.ok) {
      const json = await response.json();
      throw Error(json.message);
    }

    return response.json();
  } catch (error) {
    throw Error(error);
  }
};

export default fetchApi;
