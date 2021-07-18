const HTTP_REQUEST ={
  POST(data){
    return {
      method : "POST",
      headers:{
        'Content-Type' :'application/json;charset=uft-8',
        'Access-Control-Allow-Origin' : 'http://localhost:5500',
        'Access-Control-Allow-Credentials' :'true'
      },
      body: JSON.stringify(data)
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
     headers :{
       'Content-Type' :'application/json'
     },
     body:JSON.stringify(data)
    }
  }  
}

export {HTTP_REQUEST};