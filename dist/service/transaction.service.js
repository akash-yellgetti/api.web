"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class TransactionService extends model_service_1.Model {
    constructor() {
        super(model_1.Transaction);
    }
}
exports.transactionService = new TransactionService();
