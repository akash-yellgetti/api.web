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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradingviewController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
class Tradingview {
    constructor() {
        this.webhookLogs = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.tradingview.webhook', inputs);
            try {
                const query = inputs && inputs.query ? inputs.query : [{
                        $match: {
                            isActive: 1
                        }
                    }];
                const data = yield service_1.tradingviewService.aggregate(query);
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'webhook fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.tradingview.webhook', { error: e, inputs });
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.webhook = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.tradingview.webhook', inputs);
            try {
                const data = yield service_1.tradingviewService.create(inputs);
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'webhook fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.tradingview.webhook', { error: e, inputs });
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
    }
}
exports.TradingviewController = new Tradingview();
