const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  PUT() {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

export { HTTP_METHOD };
