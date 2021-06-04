const baseURL = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/";

 export const storage = window.localStorage;
/*body에 값 보내주는 API*/
const fetchAPI_body = async function(url, method, body){
   try{
        const result=  await fetch(baseURL+url, {
            method : method,
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body : JSON.stringify(body),
        });
        return result.json();
   } catch (error){
       console.error("error"+url);
   }
}
/*body값 없는 API*/
const fetchAPI = async function(url, method){
    try{
        let response = await fetch(baseURL+url);
        return await response.json();
    } catch (error){
        console.error("error"+error);
    }
 }

//  const fetchAPI =  function(url, method){
//      return fetch(baseURL+url)
//         .then((response) => response.json())
//         .then((data) =>{return data} );
//  }

export const userAPI = {
    addUser : (userName) => {
        return fetchAPI_body("","POST",userName);
    },
    getAllUserList : () =>{
        return  fetchAPI("","GET");
    },
    getUserList : (userID) =>{
        return fetchAPI();
    },
    deleteUser : (userID) =>{
        return fetchAPI(baseUrl);
    }
}

export const todoAPI = {
    addTodo : (item) => {
        return fetchAPI();
    },
    deleteAllTodo : (userID) => {
        return fetchAPI();
    },
    deleteTodo :(userID, ItemID) => {
        return fetchAPI();
    },
    updateItem : (userID, ItemID, Item) => {
        return fetchAPI();
    },
    updatePriorty :(userID, ItemID, priority) => {
        return fetchAPI();
    },
    toggleItem : (userID, ItemID) => {
        return fetchAPI();
    }
}
