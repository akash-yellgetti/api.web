"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.plannerService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class PlannerService extends model_service_1.Model {
    constructor() {
        super(model_1.Planner);
        this.populate = [
            {
                path: 'user', model: 'User', strictPopulate: false,
            }, {
                path: 'budget', model: 'Budget', strictPopulate: false,
            }
        ];
    }
}
exports.plannerService = new PlannerService();
