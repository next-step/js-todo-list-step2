const fetchRequest = async (url, method, data) => {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status >= 400 && response.status < 600) {
      throw Error;
    }

    const result = await response.json();

    return {
      result: result,
      error: false,
      errorMessage: "",
    };
  } catch (e) {
    return {
      result: null,
      error: true,
      errorMessage: e.message,
    };
  }
};

export { fetchRequest };
