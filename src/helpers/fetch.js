const baseUrl = process.env.REACT_APP_API_URL;


export const fetchWithoutToken = (endpoint, data, method) => {

    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {
        const requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        return fetch(url, requestOptions)
    }

}