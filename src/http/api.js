import axios from 'axios'

let base = 'http://localhost:5000/'

export const request = (method,url, params,data) => {
    return axios({
        method: method,
        url: `${base}${url}`,
        params: params,
        data:data
    })
}
