"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.planner = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
const schema_1 = require("../schema");
exports.planner = (0, express_1.Router)();
exports.planner.post('/create', middleware_1.auth, (0, middleware_1.validateRequest)(schema_1.plannerRequest.create), controller_1.PlannerController.create);
exports.planner.post('/bulk/create', middleware_1.auth, controller_1.PlannerController.bulkCreate);
exports.planner.post('/delete', middleware_1.auth, controller_1.PlannerController.delete);
exports.planner.get('/list', middleware_1.auth, controller_1.PlannerController.list);
exports.planner.get('/detail', middleware_1.auth, controller_1.PlannerController.list);
