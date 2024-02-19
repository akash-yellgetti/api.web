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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyControlController = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const moment_1 = __importDefault(require("moment"));
const utils_1 = require("../utils");
const service_1 = require("../service");
class MoneyControl {
    constructor() {
        this.optionChain = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.money-control.optionChain');
            try {
                const data = yield service_1.moneyControlService.optionChain(inputs);
                const payload = { data, message: 'optionChain data.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.search = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.money-control.search');
            try {
                const data = yield service_1.moneyControlService.search(inputs.text);
                const payload = { data, message: 'stock candles.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.details = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.money-control.details');
            try {
                const data = yield service_1.moneyControlService.details(inputs.code);
                const payload = { data, message: 'share details.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.getCandleData = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.money-control.getCandleData');
            // Get the current date and time
            const now = new Date();
            // Set the target time to 9:00 AM
            // const targetTime = new Date(now);
            const targetTime = service_1.moneyControlService.getNextNonWeekendDay(now);
            targetTime.setHours(9, 0, 0, 0); // Set hours to 9, minutes to 0, seconds to 0, milliseconds to 0
            const duration = '3';
            // Calculate the difference in minutes
            const timeDifferenceInMinutes = Math.floor((targetTime - now) / (1000 * 60));
            const countback = (Math.abs(Math.round(timeDifferenceInMinutes / Number(duration))) - 5).toString();
            const fromdateTimeString = targetTime;
            const from = (0, moment_1.default)(fromdateTimeString, "YYYY-MM-DD HH:mm:ss").unix();
            const todateTimeString = new Date();
            // const todateTimeString = "2024-01-25 15:30:05";
            const to = (0, moment_1.default)(todateTimeString, "YYYY-MM-DD HH:mm:ss").unix();
            // console.log(to)
            try {
                const params = Object.assign({ symbol: 'TATASTEEL', duration: 3, from,
                    to,
                    countback, currencyCode: 'INR', type: 'stock' }, inputs);
                const data = yield service_1.moneyControlService.getCandleData(params);
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
