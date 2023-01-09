import request from "request-promise";

export const curlRequest = async (method: string, url: string, headers: any = {}, body: any = null, params: any = {}) => {
    const options: any = { method, url, headers, body, ...params };
    const res: any = await request(options);
    return JSON.parse(res);
}