
const option = {
  method: '',
  headers: {
    'Content-Type': 'application/json'
  },
  body: ''
}

const callApi = (url, method, body) => {
  option.method = method;
  option.body = JSON.stringify(body);
  return fetch(`https://js-todo-list-9ca3a.df.r.appspot.com/${url}`, option)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status)
      }
      return data.json()
    })
    .catch(error => {
      console.log(error)
    })
}


const userStore = () => {
  const getUsers = () => {
    return callApi('api/users', 'GET')
  }

  const addUser = (user) => {
    return callApi('api/users', 'POST',{name:user})
  }

  const getUser = (userId) => {
    return callApi('api/users/:'+userId, 'GET')
  }
  return {getUsers, addUser}
}

export {userStore}