"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class DeviceService extends model_service_1.Model {
    constructor() {
        super(model_1.Device);
        this.hidden = ['__v', 'createdBy', 'updatedBy'];
        this.populate = ['user'];
    }
}
exports.deviceService = new DeviceService();
