import axios from 'axios';

const sendRequest = (url: string, method: string) => {
    let data;

    axios(url, {
        method:  method,
    }).then(data => {
        data = data
    }).catch(err => {
        data = err
    })

    return { data };
}

export default sendRequest;