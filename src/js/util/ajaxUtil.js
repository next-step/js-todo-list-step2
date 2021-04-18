const DEBUG = true;
export async function get(url,errMsg){
    const response = await fetch(url);
    let body = [];
    if (response.ok) { 
      body = await response.json();
      if(DEBUG) {
        console.log(`GET(${url}):`);
        console.log(body);
      }
    } else {
      alert(errMsg + " : " + response.status);
    }
    return body;
}
export async function post(url,data,errMsg){
    const response = await fetch(url,{
        method:'POST',
        headers: { 'Content-Type': 'application/json'},
        body : JSON.stringify(data)
        }
    );
    let body = [];
    if (response.ok) { 
      body = await response.json();
      if(DEBUG) {
        console.log(`POST(${url}):`);
        console.log(body);
      }
    } else {
      alert(errMsg + " : " + response.status);
    }
    return body;
}

export async function deleteRequest(url,errMsg){
    const response = await fetch(url,{ method:'DELETE'});
    let body = [];
    if (response.ok) { 
      body = await response.json();
      if(DEBUG) {
        console.log(`DELETE(${url}):`);
        console.log(body);
      }
    } else {
      alert(errMsg + " : " + response.status);
    }
    return body;
}
export async function put(url,data='',errMsg){
 
  const options = {method:'PUT'};
  if(data){
    options.headers ={ 'Content-Type': 'application/json'};
    options.body = JSON.stringify(data);
  }
  const response = await fetch(url,options);
  let body = [];
  if (response.ok) { 
    body = await response.json();
    if(DEBUG) {
      console.log(`PUT(${url}):`);
      console.log(body);
    }
  } else {
    alert(errMsg + " : " + response.status);
  }
  return body;
}