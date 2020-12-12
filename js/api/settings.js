const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok){
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    })
}


const get = (url) => {
    const requestOptions = {
        method: 'GET',
    }
    
    return fetch(url, requestOptions).then(handleResponse);
}

const post = (url, body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const put = (url, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);   
}

const _delete = (url) => {
    const requestOptions = {
        method: 'DELETE'
    };
    return fetch(url, requestOptions).then(handleResponse);
}

const API = {
    get,
    post,
    put,
    delete: _delete,
}

export default API;