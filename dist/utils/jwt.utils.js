"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setting_1 = require("../config/setting");
const privateKey = setting_1.setting["privateKey"];
class Jwt {
    constructor() {
        this.sign = (object, options) => {
            return jsonwebtoken_1.default.sign(object, privateKey, options);
        };
        this.decode = (token) => {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, privateKey);
                return { valid: true, expired: false, decoded };
            }
            catch (error) {
                return {
                    valid: false,
                    expired: error.message === "jwt expired",
                    decoded: null,
                };
            }
        };
    }
}
exports.jwt = new Jwt();
