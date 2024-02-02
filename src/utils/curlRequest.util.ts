import request from "request-promise";
const axios = require('axios');

export const curlRequest = async (method: string, url: string, headers: any = {}, body: any = null, params: any = {}) => {
    const options: any = { method, url, headers, body, ...params };
    // const res: any = await request(options);
    const res: any = await axios.request(options)
    return res.data;
}