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
exports.sms = void 0;
const request_1 = __importDefault(require("request"));
const callApi = (METHOD, URL, BODY) => __awaiter(void 0, void 0, void 0, function* () {
    let urlParameters = Object.entries(BODY).map(e => e.join('=')).join('&');
    var options = {
        method: METHOD,
        uri: URL + urlParameters,
    };
    (0, request_1.default)(options, function (error, response) {
        if (error)
            throw new Error(error);
        console.log(response.body);
    });
});
const sms = (toNumbers, rawMessage) => __awaiter(void 0, void 0, void 0, function* () {
    let url = 'https://api.textlocal.in/send/?';
    let sender = encodeURIComponent('ITSLET');
    let encoded_message = encodeURIComponent(rawMessage);
    let body = {
        apikey: "NTI3OTVhNGU3MDQ4NTQ0ZjYxNDc2YTQ0MzA3NDY3MzU=",
        numbers: toNumbers.join(','),
        sender: sender,
        message: encoded_message
    };
    console.log(body);
    let result = yield callApi('GET', url, body);
    return result;
});
exports.sms = sms;
// function urlEncodeLikePHP(str: any) {
//     return encodeURIComponent(str).replace(/[.!~*'()]/g, function(c) {
//         return '%' + c.charCodeAt(0).toString(16);
//     });
// }
// export const sms = (numbers: any, message: any) => {
//     console.log(message)
//     const body: any = {
//         "apikey": urlEncodeLikePHP("NTI3OTVhNGU3MDQ4NTQ0ZjYxNDc2YTQ0MzA3NDY3MzU="),
//         "numbers": [919920021073].join(','),
//         "sender": "ITSLET",
//         "message": urlEncodeLikePHP(message)
//     };
//     console.log(body)
//     const data = 'apikey='+body.apiKey+'&numbers='+body.numbers+"&sender="+body.sender+"&message="+body.message;
//     var options = {
//         'method': 'GET',
//         'url': 'https://api.textlocal.in/send/?'+data,
//     };
//     request(options, function (error: any, response: any) {
//         if (error) throw new Error(error);
//         console.log(response.body);
//     });
// }
// sms(["919920021073"], );
