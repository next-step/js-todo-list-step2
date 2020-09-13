export const Repository = class {
    #options;
    #url

    constructor(url) {
        this.#options = {
            method: "GET",
            dataType: "JSON",
            headers: {
                'Content-Type': 'application/json'
            }
        };
        this.#url = url;
    }

    #changeOptions(options) {
        this.#options = { ...this.#options, ...options };
    }
    //users/QSfs8V5zC/items/
    async fetch(method = "GET", path, body = null, before, after) {
        this.#changeOptions({ method, body:body?JSON.stringify(body):null });
        if(before)before();
        let response = await fetch(this.#url + path, this.#options).then(data=>data.json());
        if(after)after();
        return response;
    }
}
