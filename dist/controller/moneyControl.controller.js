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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyControlController = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("../utils");
const service_1 = require("../service");
class MoneyControl {
    constructor() {
        this.search = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.auth.check');
            try {
                const data = yield service_1.moneyControlService.search(inputs.text);
                const payload = { data, message: 'stock candles.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.getCandleData = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.auth.check');
            try {
                const params = Object.assign({ symbol: 'TATASTEEL', min: 5, 
                    // from: (new Date('2022-11-28 09:00 GMT').getTime()/1000),
                    // to: (new Date('2022-12-02 03:30 GMT').getTime()/1000),
                    countback: 76, currencyCode: 'INR' }, inputs);
                console.log(new Date(params.from).toUTCString());
                // example '2022-12-02 03:30 GMT'
                params.from = (new Date(params.from).getTime() / 1000),
                    params.to = (new Date(params.to).getTime() / 1000),
                    console.log('from', new Date(params.from * 1000));
                console.log('to', new Date(params.to * 1000));
                const data = yield service_1.moneyControlService.getCandleData(params.symbol, params.min, params.from, params.to, params.countback, params.currencyCode);
                const payload = { data, message: 'stock candles.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.getPeaks = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.auth.check');
            try {
                const fileData = fs.readFileSync(path.join(__dirname, '../json/tcs.json'), 'utf8');
                const data = JSON.parse(fileData);
                // const params: any = {
                //   symbol: 'TATASTEEL',
                //   min: 60,
                //   from: 1667513983,
                //   to: 1673245626,
                //   countback: 308,
                //   currencyCode: 'INR',
                //   ...inputs
                // }
                const peaks = yield service_1.moneyControlService.findPeaks(data, 'high');
                const payload = { data: peaks, message: 'stock candles.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
    }
}
exports.MoneyControlController = new MoneyControl();
