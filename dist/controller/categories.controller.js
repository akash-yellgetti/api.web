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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
class Categories {
    constructor() {
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.budget.list');
            try {
                const data = yield service_1.categoriesService.read(inputs, 0);
                return new utils_1.Api(response).success().code(200).send({ data });
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.detail = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.budget.list');
            try {
                const data = yield service_1.categoriesService.readOne({ code: inputs.code });
                return new utils_1.Api(response).success().code(200).send({ data });
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            inputs.userId = user._id;
            utils_1.log.info('controller.budget.create');
            try {
                const data = yield service_1.categoriesService.create(inputs);
                const payload = { code: 200, data, message: 'Budget create.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.bulkCreate = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.budget.bulkCreate');
            try {
                const data = yield service_1.categoriesService.bulkCreate(inputs.data);
                const payload = { code: 200, data, message: 'Budget bulk create.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.delete = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.budget.delete');
            try {
                const data = yield service_1.categoriesService.hardDeleteOne({ _id: inputs.id });
                const payload = { code: 200, data, message: 'Budget deleted.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
    }
}
exports.CategoriesController = new Categories();
