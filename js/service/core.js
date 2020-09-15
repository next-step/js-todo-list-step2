

export const request = async (url, option) => {
    try {
        const response = await fetch(url, option);
        return response.json();
    } catch (e) {
        console.error(e);
    }
};
export const options = {
    GET: (contents) => {
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: contents,
            }),
        };
    },
    POST: (name) => {
        return ;
    },
    DELETE: () => {
        return;
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