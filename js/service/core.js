
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
    return response;
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
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'DELETE',

        };
    },
    PUT_NOTHING : () =>{
      return {
          headers: {
              'Content-Type': 'application/json',
          },
          method : 'PUT',
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