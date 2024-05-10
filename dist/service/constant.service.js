"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constantService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class ConstantService extends model_service_1.Model {
    constructor() {
        super(model_1.Constant);
        this.populate = [
            {
                path: 'subdata', model: 'constant', strictPopulate: false,
            }
        ];
    }
}
exports.constantService = new ConstantService();
