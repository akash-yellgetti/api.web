import jsonwebtoken from "jsonwebtoken";
import { extend, omit } from "lodash";
import { setting } from "../config/setting";

const privateKey = setting["privateKey"];

interface res {
    code: Number,
    status: boolean,
    data: any,
    message: string,
}

export class Api {
    private response: any;
    private res: res = {
        code: 200,
        status: true,
        data: null,
        message: "API reponse"
    }

    constructor(response: Express.Response) {
        this.response = response;
    }
    
    code = (code: Number) => {
        this.res.code = code;
        return this;
    }

    success = () => {
        this.res.status = true;
        return this;
    }

    error = () => {
        this.res.status = false;
        return this;
    }

    send = (payload: any) => {
        const r = omit(extend(this.res, payload), 'code');
        return this.response.status(this.res.code).json(r);
    }
}
