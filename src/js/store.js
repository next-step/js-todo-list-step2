
const option = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}



const userStore = () => {
  const getUser = () => {
    console.log('get user')
  }

  const addUser = (user) => {
    option.body = JSON.stringify({name:user})
    console.log(option)
    fetch('https://js-todo-list-9ca3a.df.r.appspot.com/api/users', option)
    .then(data => {
      if (!data.ok) {
        throw new Error(data.status)
      }
      console.log(data)
      return data.json()
    })
    .then(post => {
      console.log(post)
      console.log(post.title)
    })
    .catch(error => {
      console.log(error)
    })
  }
  return {getUser, addUser}
}

export {userStore}