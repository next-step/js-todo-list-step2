export async function get(url,errMsg){
    const response = await fetch(url);
    let body = [];
    if (response.ok) { 
      body = await response.json();
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
    } else {
      alert(errMsg + " : " + response.status);
    }
    return body;
}

export async function deleteRequest(url,errMsg){
    const response = await fetch(url);
    let body = [];
    if (response.ok) { 
      body = await response.json();
    } else {
      alert(errMsg + " : " + response.status);
    }
    return body;
}