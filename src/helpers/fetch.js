const baseUrl = process.env.REACT_APP_API_URL;


export const fetchWithoutToken = (endpoint, data, method) => {
     
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        
        return fetch(url)

    }else{

        return fetch({
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })


    }

     
 }