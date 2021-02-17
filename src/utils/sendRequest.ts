import axios, { AxiosRequestConfig } from 'axios';

const sendRequest = (url: string, method: any) => {
    let data;

    axios(url, {
        method,
    }).then(data => {
        data = data
    }).catch(err => {
        data = err
    })

    return data;
}

export default sendRequest;