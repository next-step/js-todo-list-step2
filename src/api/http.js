export const request = async (method, path, data) => {
  const config = { method };
  if (data) {
    config.headers = { "Content-Type": "application/json" };
    config.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(path, config);

    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  } catch (e) {
    console.error("Error: ", e);
  }
};

export const GET = (path) => request("GET", path);
export const POST = (path, data) => request("POST", path, data);
export const DELETE = (path) => request("DELETE", path);
export const PUT = (path, data) => request("PUT", path, data);
