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
exports.moneyControlService = void 0;
const curlRequest_util_1 = require("../utils/curlRequest.util");
const moment_1 = __importDefault(require("moment"));
const lodash_1 = __importDefault(require("lodash"));
class MoneyControlService {
    constructor() {
        this.search = (text) => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&type=1&format=json&query=' + text;
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            const data = Object.assign({}, response);
            return data;
        });
        this.detail = (code) => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://priceapi-aws.moneycontrol.com/pricefeed/nse/equitycash/' + code;
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            const data = Object.assign({}, response);
            return data;
        });
        this.historicalData = (code) => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://www.moneycontrol.com/tech_charts/nse/his/' + lodash_1.default.toLower(code) + '.csv';
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            const data = Object.assign({}, response);
            return data;
        });
        this.getCandleData = (symbol, resolution, from, to, countback = 308, currencyCode = 'INR') => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://priceapi.moneycontrol.com/techCharts/indianMarket/stock/history?symbol=' + symbol +
                '&resolution=' + resolution +
                '&from=' + from +
                '&to=' + to +
                '&countback=' + countback +
                '&currencyCode=' + currencyCode;
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            const { s, t, o, h, l, c, v } = response;
            const data = [];
            for (const i in t) {
                if (i && t && t[i]) {
                    data.push({
                        ntime: this.getNormalDateFormat(t[i]),
                        time: t[i],
                        open: o[i],
                        low: l[i],
                        high: h[i],
                        close: c[i],
                        volume: v[i]
                    });
                }
            }
            return data;
        });
        this.getNormalDateFormat = (timestamp) => {
            return (0, moment_1.default)(new Date(timestamp * 1000)).utcOffset("+05:30").format('llll'); // December 28, 2022, 3:30
        };
        this.findPeaks = (data, key = 'close') => {
            let peaks = [];
            for (let i = 1; i < data.length - 1; i++) {
                const previous = data[i - 1][key];
                const current = data[i][key];
                const next = data[i + 1][key];
                if (current > previous && current > next) {
                    peaks.push(data[i]);
                }
            }
            return peaks;
        };
    }
}
exports.moneyControlService = new MoneyControlService();
