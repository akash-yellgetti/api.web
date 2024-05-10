"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class BudgetService extends model_service_1.Model {
    constructor() {
        super(model_1.Budget);
        this.populate = [
            {
                path: 'subdata', model: 'Budget', strictPopulate: false,
            },
            {
                path: 'user', model: 'User', strictPopulate: false,
            }
        ];
    }
}
exports.budgetService = new BudgetService();
