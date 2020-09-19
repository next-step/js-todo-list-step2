export function fetcher(params,callback){
    fetch(params.url,params.option)
    .then(res =>{
        let json = res.json();
        if(res.status >= 200 && res.status < 300)
            return json.then(callback);
        else 
            return json.then(error=>{throw new Error(error.message)});
    })
    .catch(error =>{
        console.log(error.message);
        alert(error.message);
    })
}
