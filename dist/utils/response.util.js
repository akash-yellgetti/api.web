"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const lodash_1 = require("lodash");
const setting_1 = require("../config/setting");
const privateKey = setting_1.setting["privateKey"];
class Api {
    constructor() {
        this.response = (response, res) => {
            return response.send((0, lodash_1.omit)(res, 'code'));
        };
    }
}
exports.api = new Api();
