const headers = { 'Content-Type': "application/json"};

export const HTTP_METHOD = {
  POST(data) {
    return {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  PUT(data) {
    return {
      method: "PUT",
      headers,
      body: JSON.stringify({
        ...data,
      }),
    };
  },
  PATCH(data) {
    return {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        ...data
      }),
    };
  },
  DELETE() {
    return {
      method: "DELETE"
    };
  },
};