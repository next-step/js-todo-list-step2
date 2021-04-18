
const option = {
  method: '',
  headers: {
    'Content-Type': 'application/json'
  },
  body: ''
}

const callApi = (url, method) => {
  option.method = method;
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
  const getUser = () => {
    console.log('get user')
  }

  const addUser = (user) => {
    option.body = JSON.stringify({name:user})
    return callApi('/api/users', 'POST')
  }
  return {getUser, addUser}
}

export {userStore}