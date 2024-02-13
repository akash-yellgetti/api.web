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
const axios = require('axios');
// const talib = require('ta-lib');
const ta = require('technicalindicators');
// const CrossOver = ta.CrossOver;
class MoneyControlService {
    constructor() {
        this.optionChain = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const headers = {
                'authority': 'www.nseindia.com',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'en-US,en;q=0.9',
                'cache-control': 'no-cache',
                'cookie': 'nsit=3t1ka4ygMkVyBHkiWbRhPBGN; AKA_A2=A; defaultLang=en; _ga=GA1.1.1448677211.1706872248; ak_bmsc=8336EE020BF24A785676E26CBD33B4F5~000000000000000000000000000000~YAAQxfY3F1X/hlWNAQAA3piDaRZoWpTMnXuoyU4YzZTm20amnkkSE4gqynWESEU6qDAEwv+/WcZw7Q0A/6EpVXI632pm7JzEuoUsL7haN6i3L2Yhz36Rw+K/WIUIaaAHJbK+u3qgd6a2LSSClF/KqM0K75dpoBC19Ci8stleVRb4onJJH4i816wgHfTnL6QHqU00QwHBZd45IyY92S1fa4vBn8k2FArq+CCpPqdzjwD/Hb1hvtoQKY6p+z9xio1K+iJaxAxrGTaxCCe8sAgHKTUHfOrJMg8wARKMVC45I/vgpYbxVQ/T6gwmAsK61B1C6IDYkB+lBCvczVKzZAv4iyScke8GV0qoIh/cRUvd99Yc09U62zYV2rLsA1bN9+N/gQilqFdFYBriEXjD28odGnBUcIc4DCMo9R58UTrC0JUurMJEBnFxI2IXoFIoZhkXeVFogEZZoyVuZowaActg4DPkxmQruh3o5A2nyrrQo8T9OPgwuCz/7H4T9LfeyecAQm8E; _ga_QJZ4447QD3=GS1.1.1706872247.1.1.1706872326.0.0.0; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTcwNjg3MjQxOSwiZXhwIjoxNzA2ODc5NjE5fQ.nxLGjNb6vNsTvjdVtDxdsX6MTWZ8CKYMv4g8DUgiops; _ga_87M7PJ3R97=GS1.1.1706872248.1.1.1706872419.0.0.0; RT="z=1&dm=nseindia.com&si=623cf2a0-41ae-4fc7-86fd-3945d1ab09c4&ss=ls4jrnbq&sl=0&se=8c&tt=0&bcn=%2F%2F684d0d49.akstat.io%2F"; bm_sv=78FC7DF033BB35B563B9DEBED2F889B9~YAAQxfY3FwR4h1WNAQAAP0uXaRavW9xjlB2B5utlyFluT61H1Um0jBqF4l98XXOYExMeyicV2q/LusVd3qPGB9/QelTg/4bU/hoF2MkLAAkl3xgGRSA7xwRL/URcQ9jngHmmLmhueEcILVklIa6kVnZn9+k/mfixnAspFah+A/EMgvGN8t/q4YK7tG/5Oht6iwPvTGl/4PSnCEeprWaQ4UD1QML8T12emo/NBF9cLCUSye6siffJKlnEw0nh9bIvb7/q~1; AKA_A2=A; ak_bmsc=8336EE020BF24A785676E26CBD33B4F5~000000000000000000000000000000~YAAQxfY3F4PLh1WNAQAAFEKeaRZ6C3iill1oCh67rQDuYpUA4fQWtA1nV2L8+nGeqwea5ORfXIf9UUrehJEmxTFjKfDJi9DRyG7ya/f21IldjbzdTH3844SB/bk1KMXftuuZFQDhBLxOrteHsSimDhniC789oXCAX+dunigENNgOstEqcVM2Q6Qx9BD6tqKNMXjX+jo/ac+C4idfMCtWsrwyW/WuYy1kRWjjvTEeAdsv0+SieBfd6gPWqp6HE2y2J55dztVSXaeGptII0CUxYmSBKjcAzRNWY1cDAamYziJD2/lcyq5lzZTC0rE8E4SNMnoN3kyERmkQ1d3qwbUDIucDlSpUGAOQu7BqE2WzapgyXPID40kqfTBVECtNZmBwSHt/9xaekDF/DT76DNVbasIekuK71XuQ5J1TURbahpGCWlHEJk8GKhf2pXKnDUR5gcgSRFrhvZGmIqvZOaj5/gfeTdsre0mosJhbJB4NDqvf2HSY0fgogHrW8lmcqYme9Q0qC78d; bm_sv=78FC7DF033BB35B563B9DEBED2F889B9~YAAQxfY3F4TLh1WNAQAAFEKeaRZWM2+CMEULpOfTzG83LMOELh6e+07MQeiBZnOu/1s+UvWyLLeNAH5IptE3Jt0jgAvDf1XIx6onbA63ef25uSTmVvC5ESUP6n502l28kGaIonI1Rz5E3Gj3hdWpmgVgjYTMb2Kh4yoL0z/CEZwlhuuB05nrO4lG45ICt1RmXvdAGlpO13JS4S7Uzeqxvh4SmDWHI4j6BjaJqv9NJTkjdFTqVbPVYvQqHWZyBVIIOG2T~1',
                'pragma': 'no-cache',
                'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
            };
            const url = 'https://www.nseindia.com/api/option-chain-indices?symbol=' + inputs.symbol;
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url, headers);
            return response;
        });
        this.search = (text) => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://www.moneycontrol.com/mccode/common/autosuggestion_solr.php?classic=true&type=1&format=json&query=' + text;
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            const data = lodash_1.default.map(response, (r) => {
                r.symbol = lodash_1.default.trim(lodash_1.default.split(r.pdt_dis_nm, ',')[1]);
                return r;
            });
            return data;
        });
        this.details = (code) => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/' + code;
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            return response.data;
        });
        this.historicalData = (code) => __awaiter(this, void 0, void 0, function* () {
            const url = 'https://www.moneycontrol.com/tech_charts/nse/his/' + lodash_1.default.toLower(code) + '.csv';
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            return response;
        });
        this.getCandleData = (params) => __awaiter(this, void 0, void 0, function* () {
            const url = `https://priceapi.moneycontrol.com/techCharts/indianMarket/${params.type}/history?symbol=${params.symbol}&resolution=${params.duration}&from=${params.from}&to=${params.to}&countback=${params.countback}&currencyCode=${params.currencyCode}`;
            const response = yield (0, curlRequest_util_1.curlRequest)('GET', url);
            const { s, t, o, h, l, c, v } = response;
            return this.algoTrade(response);
        });
        this.getNextNonWeekendDay = (date) => {
            const dayOfWeek = date.getDay();
            const daysToAdd = dayOfWeek === 5 ? 2 : dayOfWeek === 6 ? 1 : 0; // Skip Saturday or Sunday
            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + daysToAdd + 1); // Add days to reach the next non-weekend day
            nextDay.setHours(9, 0, 0, 0); // Set time to 9:00 AM
            return nextDay;
        };
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
        this.calculateVWAP = (trades) => {
            let totalValue = 0;
            let totalVolume = 0;
            for (const i in trades) {
                if (trades[i]) {
                    const trade = trades[i];
                    totalValue += trade.close * trade.volume;
                    totalVolume += trade.volume;
                    // Calculate VWAP
                    trades[i]['vwap'] = Number((totalValue / totalVolume).toFixed(2));
                }
            }
            // console.log(trades)
            return trades;
        };
        this.algoTrade = (data) => {
            try {
                const period = 5;
                const input = ta.HeikinAshi.calculate({ open: data.o, high: data.h, low: data.l, close: data.c, volume: data.v });
                // data.vwap = ta.sma(smaInput)
                const smaInput = {
                    period,
                    values: input.c
                };
                const vwap = ta.vwap(input);
                const ema5 = ta.ema({ period, values: input.close });
                const ema10 = ta.ema({ period: period * 2, values: input.close });
                const emaBuySignal = ta.crossOver({ lineA: ema5, lineB: ema10 });
                let res = data.t.map((item, i) => ({
                    timestamp: moment_1.default.unix(item).format("YYYY-MM-DD HH:mm:ss"),
                    open: data["o"][i],
                    high: data["h"][i],
                    low: data["l"][i],
                    close: data["c"][i],
                    volume: data["v"][i],
                    vwap: vwap[i],
                    ema5: ema5[i],
                    ema10: ema10[i],
                    emaBuySignal,
                    // ema2: i >= 5 ? Number(ema2[i-2].toFixed(2)) : 0,
                    // ema3: i >= 5 ? Number(ema2[i-3].toFixed(2)) : 0,
                    // ema5: i >= 5 ? Number(ema5[i-5].toFixed(2)) : 0,
                    // ema10: i >= 10 ? Number(ema10[i-10].toFixed(2)) : 0,
                    // ema15: i >= 15 ? Number(ema15[i-15].toFixed(2)) : 0,
                    // ema20: i >= 20 ? Number(ema20[i-20].toFixed(2)) : 0,
                }));
                return res;
            }
            catch (error) {
                console.log(error);
            }
        };
        this._algoTrade = (data) => {
            try {
                const accountFund = 100000;
                // ema
                // const ema2 = talib.EMA(data.c, 2);
                // const ema3 = talib.EMA(data.c, 3);
                // const ema5 = talib.EMA(data.c, 5);
                // const ema10 = talib.EMA(data.c, 10);
                // const ema15 = talib.EMA(data.c, 15);
                // const ema20 = talib.EMA(data.c, 20);
                let res = data.t.map((item, i) => ({
                    timestamp: moment_1.default.unix(item).format("YYYY-MM-DD HH:mm:ss"),
                    open: data["o"][i],
                    high: data["h"][i],
                    low: data["l"][i],
                    close: data["c"][i],
                    volume: data["v"][i],
                    // ema2: i >= 5 ? Number(ema2[i-2].toFixed(2)) : 0,
                    // ema3: i >= 5 ? Number(ema2[i-3].toFixed(2)) : 0,
                    // ema5: i >= 5 ? Number(ema5[i-5].toFixed(2)) : 0,
                    // ema10: i >= 10 ? Number(ema10[i-10].toFixed(2)) : 0,
                    // ema15: i >= 15 ? Number(ema15[i-15].toFixed(2)) : 0,
                    // ema20: i >= 20 ? Number(ema20[i-20].toFixed(2)) : 0,
                }));
                res = this.calculateVWAP(res);
                res = this.identifyFirst30MinuteCandles(res);
                for (const i in res) {
                    if (res[i]) {
                        const previousCandle = res[Number(i) > 0 ? Number(i) - 1 : i];
                        const candle = res[i];
                        candle['priceChange'] = candle['close'] - previousCandle['close'];
                        candle['volumeChange'] = candle['volume'] - previousCandle['volume'];
                        candle['trend'] = 'side';
                        if (candle['ema5'] >= candle['ema10'] && candle['ema10'] >= candle['ema15'] && candle['ema15'] >= candle['ema20']) {
                            candle['trend'] = 'up';
                        }
                        if (candle['ema5'] <= candle['ema10'] && candle['ema10'] <= candle['ema15'] && candle['ema15'] <= candle['ema20']) {
                            candle['trend'] = 'down';
                        }
                        candle['signal'] = '';
                        candle['price'] = '';
                        candle['stopLoss'] = '';
                        candle['stopLossHit'] = '';
                        if (candle['trend'] == 'down' && candle['close'] <= previousCandle['close'] && candle['ema3'] < candle['dayLow'] && candle['dayLow'] != 1000000) {
                            candle['signal'] = 'Sell';
                            candle['price'] = candle['close'];
                            candle['stopLoss'] = previousCandle['high'];
                            candle['stopLossHit'] = candle['high'] > previousCandle['high'];
                        }
                        if (candle['trend'] == 'up' && candle['close'] >= previousCandle['close'] && candle['ema3'] > candle['dayHigh'] && candle['dayHigh'] != -1000000) {
                            candle['signal'] = 'Buy';
                            candle['price'] = candle['close'];
                            candle['stopLoss'] = previousCandle['low'];
                            candle['stopLossHit'] = candle['low'] < previousCandle['low'];
                        }
                    }
                }
                return res;
            }
            catch (error) {
                throw error;
            }
        };
    }
    identifyFirst30MinuteCandles(data) {
        let date = new Date(data[0]['timestamp']);
        // console.log(date)
        let dayHigh = -Math.pow(10, 6);
        let dayLow = Math.pow(10, 6);
        let dayMid = 0;
        for (const i in data) {
            const candle = data[i];
            const timestamp = new Date(candle.timestamp);
            // console.log(' cond ', date != timestamp)
            const hours = timestamp.getHours();
            const minutes = timestamp.getMinutes();
            if (date.toDateString() != timestamp.toDateString()) {
                date = new Date(candle.timestamp);
                dayHigh = -Math.pow(10, 6);
                dayLow = Math.pow(10, 6);
                dayMid = 0;
            }
            // Check if the time is greater than 9:00 AM and less than or equal to 9:30 AM
            if (hours === 9 && minutes >= 0 && minutes <= 30) {
                const date = timestamp.toDateString(); // Extracting the date part
                data[i]['dayHigh'] = dayHigh;
                data[i]['dayMid'] = dayMid;
                data[i]['dayLow'] = dayLow;
                dayHigh = Math.max(candle.high, dayHigh);
                dayLow = Math.min(candle.low, dayLow);
                dayMid = Number(lodash_1.default.mean([dayHigh, dayLow]).toFixed());
            }
            else {
                data[i]['dayHigh'] = dayHigh;
                data[i]['dayMid'] = dayMid;
                data[i]['dayLow'] = dayLow;
            }
        }
        return data;
    }
}
exports.moneyControlService = new MoneyControlService();
