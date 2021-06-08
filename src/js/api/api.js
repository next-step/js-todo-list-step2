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

export const userAPI = {
    addUser : (userName) => {
        return fetchAPI_body("","POST",userName);
    },
    getAllUserItems : () =>{
        return  fetchAPI_GET("","GET");
    },
    getUserItems : (userID) =>{
        return fetchAPI_GET(`${userID}/items/`,"GET");
    },
    deleteUser : (userID) =>{
        console.log("deleteUser");
        return fetchAPI_DELETE(userID,"DELETE");
    }
}

export const todoAPI = {
    addTodo : (userid, item) => {
        return fetchAPI_body(`${userid}/items`,"POST",item);
    },
    deleteAllTodo : (userID) => {
        return fetchAPI_DELETE(`${userID}/items`,"DELETE");
    },
    deleteTodo :(userID, ItemID) => {
        return fetchAPI_DELETE(`${userID}/items/${ItemID}`,"DELETE");
    },
    updateItem : (userID, ItemID, updateItem) => {
        return fetchAPI_body(`${userID}/items/${ItemID}`,"PUT",updateItem);
    },
    updatePriorty :(userID, ItemID, priority) => {
        return fetchAPI_body(`${userID}/items/${ItemID}/priority`,"PUT",priority);
    },
    toggleItem : (userID, ItemID) => {
        return fetchAPI_body(`${userID}/items/${ItemID}/toggle`,'PUT');
    }
}
