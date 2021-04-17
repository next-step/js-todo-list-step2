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