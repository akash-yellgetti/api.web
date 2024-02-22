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
exports.FyersController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
class Fyers {
    constructor() {
        this.webhook = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.fyers.webhook', inputs);
            try {
                const data = yield service_1.fyersService.handleWebhook(inputs);
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'webhook fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.webhook', { error: e, inputs });
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.getAuthCode = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.fyers.getAuthCode');
            try {
                const data = yield service_1.fyersService.getAuthCode();
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'authcode fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.getAuthCode', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.getAccessToken = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign(Object.assign({}, request.body), request.params), request.query);
            utils_1.log.info('controller.fyers.getAccessToken');
            try {
                const data = yield service_1.fyersService.getAccessToken(inputs);
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'access token fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.getAccessToken', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.getProfile = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.fyers.profile');
            try {
                const data = yield service_1.fyersService.getProfile();
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'profile fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.profile', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.getHistoricalData = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.fyers.getHistoricalData');
            try {
                const data = yield service_1.fyersService.getHistoricalData(inputs);
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'getHistoricalData fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.getHistoricalData', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.getPositions = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.fyers.getPositions');
            try {
                const data = yield service_1.fyersService.getPositions();
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'getPositions fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.getPositions', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.getOrders = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.fyers.getOrders');
            try {
                const data = yield service_1.fyersService.getOrders();
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'getOrders fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.getOrders', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.orderPlace = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.fyers.orderPlace');
            try {
                const data = yield service_1.fyersService.orderPlace(inputs);
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data, message: 'orderPlace fetched Succesfully.' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.fyers.orderPlace', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
    }
}
exports.FyersController = new Fyers();
