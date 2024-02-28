"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
const lodash_1 = require("lodash");
const setting_1 = require("../config/setting");
const path = __importStar(require("path"));
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
        this.render = (viewPath) => {
            return this.response.sendFile(path.resolve(__dirname, viewPath));
        };
        this.response = response;
    }
}
exports.Api = Api;
