export const parseFormData = (target) => {
    const formBody = [];
    for (var property in target) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(target[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody;
}

export const parseResponse = (response) => {
   const responseStatusCode = response.status;
   if(responseStatusCode === 200){
       return response.json();
   }
 
}

