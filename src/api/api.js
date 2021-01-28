const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const ADD_USER = '/api/users';

export const addUser = async (name) => {
  console.log('I`m addUser');
  try {
    const response = await fetch(`${BASE_URL}${ADD_USER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    alert(err);
  }
};

// export default {
//   addUser,
// };
