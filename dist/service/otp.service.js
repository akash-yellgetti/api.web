"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class OtpService extends model_service_1.Model {
    constructor() {
        super(model_1.Otp);
    }
}
exports.otpService = new OtpService();
