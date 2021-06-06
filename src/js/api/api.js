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
const fetchAPI_GET = async function(url){
    try{
        let response = await fetch(baseURL+url);
        return await response.json();
    } catch (error){
        console.error("error"+error);
    }
 }

 const fetchAPI_DELETE = async function(url, method){
    try{
        let response = await fetch(baseURL+url,{
        method:"DELETE"})
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
    getAllUserItems : () =>{
        return  fetchAPI_GET("","GET");
    },
    //https://js-todo-list-9ca3a.df.r.appspot.com/api/users/J-BuG57Uc/items/
    getUserItems : (userID) =>{
        return fetchAPI_GET(`${userID}/items/`,"GET");
    },
    deleteUser : (userID) =>{
        console.log("deleteUser");
        return fetchAPI_DELETE(userID,"DELETE");
    }
}

export const todoAPI = {
    //POST /api/users/:userId/items/
    addTodo : (userid, item) => {
        return fetchAPI_body(`${userid}/items`,"POST",item);
    },
    ///api/users/:userId/items/ DELETE
    deleteAllTodo : (userID) => {
        return fetchAPI_DELETE(`${userID}/items`,"DELETE");
    },
    //DELETE	/api/users/:userId/items/:itemId
    deleteTodo :(userID, ItemID) => {
        return fetchAPI_DELETE(`${userID}/items/${ItemID}`,"DELETE");
    },
    updateItem : (userID, ItemID, Item) => {
        return fetchAPI();
    },
    updatePriorty :(userID, ItemID, priority) => {
        return fetchAPI();
    },
    //put /api/users/:userId/items/:itemId/toggle
    toggleItem : (userID, ItemID) => {
        return fetchAPI_body(`${userID}/items/${ItemID}/toggle`,'PUT');
    }
}
