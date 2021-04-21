const DEBUG = false;
const HTTP_REQUEST_METHOD = {
  GET:'GET',
  POST:'POST',
  DELETE:'DELETE',
  PUT:'PUT',
  setFetchOptions : (method, payload) =>{
    const options = {};
    options.method = method;
    if(method == HTTP_REQUEST_METHOD.GET || method == HTTP_REQUEST_METHOD.DELETE) {
      return options;
    }
    if(payload){
      options.headers ={ 'Content-Type': 'application/json'};
      options.body = JSON.stringify(payload);
    }
    return options;
  }
}

const request = async (url,requestMethod,payload,errMsg)=>{
  const options = HTTP_REQUEST_METHOD.setFetchOptions(requestMethod,payload);
  const response = await fetch(url,options);
    let body = [];
    if (response.ok) { 
      body = await response.json();
      if(DEBUG) {
        console.log(`${requestMethod}(${url}):`);
        console.log(body);
      }
    } else {
      alert(errMsg + " : " + response.status);
    }
    return body;
} 
export async function get(url,errMsg){
    return await request(url,HTTP_REQUEST_METHOD.GET, null, errMsg);
}
export async function post(url,data,errMsg){
  return await request(url,HTTP_REQUEST_METHOD.POST, data, errMsg);
}

export async function deleteRequest(url,errMsg){
  return await request(url,HTTP_REQUEST_METHOD.DELETE, null, errMsg);
}
export async function put(url,{data,errMsg}){
  return await request(url,HTTP_REQUEST_METHOD.PUT, data, errMsg);
}
