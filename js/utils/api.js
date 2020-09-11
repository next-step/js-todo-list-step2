const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com"

const METHOD = {
    GET : 'get',
    POST : 'post',
}

class Api {
    constructor(url, method) {
        this.url = url;
        this.method = method;
    }

    get(url) {
        this.url = BASE_URL + url
        this.method = METHOD.GET;
        return this;
    }

    post(url) {
        this.url = BASE_URL + url;
        this.method = METHOD.POST;
        this.headers = {
            'Content-Type': 'application/json',
        }
        return this;
    }

    headers(headers) {
        this.headers = headers
        return this;
    }

    data(body) {
        this.body = body
        return this;
    }

    build = async () => {
        try {
            const {url, ...option} = this;
            const response = await fetch(url, option)
            checkSuccess(response.status)
            return await response.json();
        } catch(e) {
            console.error(e)
        }
    }
}

const checkSuccess = (status) => {
    if(!isSuccess(status)) {
        throw new Error(`http request error : status code ${status}`)
    }
}

const isSuccess = (status) => {
    return status >= 200
}

export default Api;