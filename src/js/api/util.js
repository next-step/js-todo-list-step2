const HTTP_REQUEST ={
  POST(data){
    return {
      method : "POST",
    }
  },
  DELETE(){
    return {
     method : "DELETE",
    }
  },
  PUT(data){
    return {
     method : "PUT",
    }
  }  
}

export {HTTP_REQUEST};