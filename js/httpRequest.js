const base_url = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const addUser = async (name) => await fetch(
    `${base_url}/api/users`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    }
);

const getUser = async () => {
    const response = await fetch(
        `${base_url}/api/users`,
        {
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response.json();
};



export { addUser, getUser };