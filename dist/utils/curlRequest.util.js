"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.curlRequest = void 0;
const request_promise_1 = __importDefault(require("request-promise"));
const curlRequest = (method, url, headers = {}, body = null, params = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const options = Object.assign({ method, url, headers, body }, params);
    const res = yield (0, request_promise_1.default)(options);
    return JSON.parse(res);
});
exports.curlRequest = curlRequest;
