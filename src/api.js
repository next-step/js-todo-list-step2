const API_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

export async function getUsersData() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addUserData(data = {}) {
  await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
