export const getUsers = async () => {
  try {
    const response = await fetch(
      'https://blackcoffee-todolist.df.r.appspot.com/api/u',
      {
        method: 'GET',
      }
    );
    const users = await response.json();
    return users;
  } catch (e) {
    console.error(`Error: getUsers / ${e.message}`);
    throw Error(e.message);
  }
};
