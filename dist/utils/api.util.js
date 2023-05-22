"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const lodash_1 = require("lodash");
const setting_1 = require("../config/setting");
const privateKey = setting_1.setting["privateKey"];
class Api {
    constructor(response) {
        this.res = {
            code: 200,
            status: true,
            data: null,
            message: "API reponse"
        };
        this.code = (code) => {
            this.res.code = code;
            return this;
        };
        this.success = () => {
            this.res.status = true;
            return this;
        };
        this.error = () => {
            this.res.status = false;
            return this;
        };
        this.send = (payload) => {
            const r = (0, lodash_1.omit)((0, lodash_1.extend)(this.res, payload), 'code');
            return this.response.status(this.res.code).json(r);
        };
        this.response = response;
    }
}
exports.Api = Api;
