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
exports.NotificationController = void 0;
const utils_1 = require("../utils");
const app_1 = require("../config/app");
class Notification {
    constructor() {
        this.send = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.socket.list');
            try {
                app_1.app.getSocketIO().to("main-channel").emit("notification", inputs);
                //   const user = await socketService.read({  isActive: true });
                return new utils_1.Api(response).success().code(200).send({});
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
    }
}
exports.NotificationController = new Notification();
