import { parseFormData, parseResponse } from '../js/util.js'



const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

async function requestPostFormData(url, requestData) {
    try{
       const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'POST',
            headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
            body: parseFormData(requestData)
        });
        return parseResponse(response);

    }catch(error){
        console.error(error);
    }
}

async function requestGet(url) {
    try{
       const response = await fetch(`${BASE_URL}/${url}`);
       return parseResponse(response);
    }catch(error){
        console.error(error);
    }
}

async function requestPostJSON(url, data) {
    try{
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return parseResponse(response);
    }catch(error){
        console.error(error);
    }
}

async function requestPut(url) {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        return parseResponse(response);
    } catch (error) {
        console.error(error);
    }
}

async function requestPutBody(url, data) {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return parseResponse(response);
    } catch (error) {
        console.error(error);
    }
}

async function requestDelete(url) {
    try {
        const response = await fetch(`${BASE_URL}/${url}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        return parseResponse(response);
    } catch (error) {
        console.error(error);
    }
}


export { requestPostFormData, requestGet, requestPostJSON, requestPut, requestDelete, requestPutBody }