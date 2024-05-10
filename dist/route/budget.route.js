"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budget = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
exports.budget = (0, express_1.Router)();
exports.budget.post('/create', middleware_1.auth, controller_1.BudgetController.create);
exports.budget.post('/bulk/create', middleware_1.auth, controller_1.BudgetController.bulkCreate);
exports.budget.post('/delete', middleware_1.auth, controller_1.BudgetController.delete);
exports.budget.get('/list', middleware_1.auth, controller_1.BudgetController.list);
exports.budget.get('/detail', middleware_1.auth, controller_1.BudgetController.list);
