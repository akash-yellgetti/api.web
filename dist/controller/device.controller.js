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
exports.DeviceController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
class Device {
    constructor() {
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.contact.list');
            try {
                const data = yield service_1.deviceService.read({ userId: user._id });
                return new utils_1.Api(response).success().code(200).send({ data });
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            inputs.userId = request.user._id;
            utils_1.log.info('controller.contact.created');
            try {
                inputs.data = Object.assign({}, inputs);
                const user = yield service_1.deviceService.create(inputs);
                return new utils_1.Api(response)
                    .success()
                    .code(200)
                    .send({ data: user, message: 'created Succesful' });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.contact.created', Object.assign({}, e));
                return new utils_1.Api(response)
                    .error()
                    .code(code)
                    .send(Object.assign({}, e));
            }
        });
        this.detail = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const detail = yield service_1.deviceService.readOne({ _id: inputs._id });
                console.log('detail', detail);
                const payload = { code: 200, data: detail, message: 'contact detail' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
    }
}
exports.DeviceController = new Device();
