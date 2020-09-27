export function fetcher({url,option}){
    return fetch(url,option)
    .then(res =>{
        const json = res.json();
        if(res.status >= 200 && res.status < 300)
            return json;
        return json.then(error=>{throw new Error(error.message)});
    })
    .catch(error =>{
        alert(error.message);
    })
}
