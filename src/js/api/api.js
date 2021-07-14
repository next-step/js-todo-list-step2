const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';


export const userAPI = {
  getAllUser(){
    return fetch(BASE_URL).then(data => data.json());
  },
  getDeleteUser(id){
    return fetch(`${BASE_URL}/${id}`,HTTP_REQUEST.DELETE)
  },
  getAddUser(data){

  },
  getUser(id){

  }
}


export const todoAPI = {

}