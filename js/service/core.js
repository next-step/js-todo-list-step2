
export const request =  (url, option) => {
    const response =  fetch(url, option)
        .then(data => {
            if (!data.ok) {
                throw new Error(data.status);
            }
            return data;
        })
        .catch(error => {
            console.log(`error : ${error} `)
        });
    return response.json();
}


export const options = {
    POST: (contents) => {
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
            }),
        };
    },
    DELETE: () => {
        return {
            method: 'DELETE',

        };
    },
    PUT_TOGGLE: () => {
        return {
            method: 'PUT',
        };
    },
    PUT_PRIORITY: (priority) => {
        return {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                priority
            })
        }
    },
    PUT: (contents) => {
        return {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents
            })
        }
    }

}