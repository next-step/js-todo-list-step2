export function fetcher(params,callback){
    return fetch(params.url,params.option)
    .then(res =>{
        const json = res.json();
        if(res.status >= 200 && res.status < 300)
            return json;
        else 
            return json.then(error=>{throw new Error(error.message)});
    })
    .catch(error =>{
        alert(error.message);
    })
}
