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
exports.SocketController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
class Socket {
    constructor() {
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.socket.list');
            try {
                const user = yield service_1.socketService.read({ isActive: true });
                return utils_1.api.response(response, { code: 200, status: 'success', data: user, message: 'Socket Active List' });
            }
            catch (e) {
                utils_1.log.error(e);
                return response.status(409).json(e);
            }
        });
    }
}
exports.SocketController = new Socket();
