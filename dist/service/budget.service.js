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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.budgetService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
const lodash_1 = __importDefault(require("lodash"));
const planner_service_1 = require("./planner.service");
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
    processCreate(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            let budget = null;
            switch (inputs.type) {
                case 'investment':
                case 'goal':
                    const data = lodash_1.default.omit(inputs, ['planner']);
                    // data.amount = _.get(inputs, 'planner.current.amount', 0);
                    budget = yield this.create(data);
                    const current = lodash_1.default.omit(inputs.planner.current, ['emi']);
                    // current.amount = budget.amount;
                    yield planner_service_1.plannerService.create(Object.assign({ budgetId: budget._id, userId: budget.userId, title: data.title, description: data.description, type: inputs.type, data: inputs.planner }, current));
                    break;
                case 'expense':
                    if (inputs.category === 'loan') {
                        const data = lodash_1.default.omit(inputs, ['planner']);
                        data.amount = lodash_1.default.get(inputs, 'planner.current.emi', 0);
                        budget = yield this.create(data);
                        const current = lodash_1.default.omit(inputs.planner.current, ['emi']);
                        yield planner_service_1.plannerService.create(Object.assign({ budgetId: budget._id, userId: budget.userId, title: data.title, description: data.description, type: inputs.category, data: inputs.planner }, current));
                    }
                    break;
                default:
                    budget = yield this.create(inputs);
                    break;
            }
            return budget;
        });
    }
}
exports.budgetService = new BudgetService();
