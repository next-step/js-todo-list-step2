const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com/";


const fetchAPI = async function(url, method, body){
   try{
        const result=  await fetch(baseUrl+url, {
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

export const userAPI = {
    addUser : (userName) => {
        return fetchAPI(api/users,"POST",userName);
    },
    getUserList : () =>{
        return fetchAPI();
    },
    loadUser : (userID) =>{
        return fetchAPI();
    },
    deleteUser : (userID) =>{
        return fetchAPI();
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
