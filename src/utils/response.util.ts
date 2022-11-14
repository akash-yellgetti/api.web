import jsonwebtoken from "jsonwebtoken";
import { omit } from "lodash";
import { setting } from "../config/setting";

const privateKey = setting["privateKey"];

interface res {
    code: Number,
    status: string,
    data: any,
    message: string,
}

class Api {
    response = (response: any, res: res) => {
        return response.send(omit(res, 'code'));
    }    
}


export const api = new Api();
