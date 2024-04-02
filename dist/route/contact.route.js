"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contact = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const middleware_1 = require("../middleware");
exports.contact = (0, express_1.Router)();
exports.contact.post('/create', middleware_1.auth, controller_1.ContactController.create);
exports.contact.get('/detail', middleware_1.auth, controller_1.ContactController.detail);
