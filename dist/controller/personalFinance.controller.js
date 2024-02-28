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
exports.PersonalFinanceController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
const lodash_1 = __importDefault(require("lodash"));
class PersonalFinance {
    constructor() {
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = lodash_1.default.pick(Object.assign(Object.assign({}, request.body), request.params), ['name', 'members']);
            const name = inputs && inputs.name ? inputs.name : '';
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const conversation = yield service_1.conversationService.create({ type: 'group', name, createdBy: user._id, updatedBy: user._id });
                const conversationMembers = yield service_1.conversationMemberService.addUsers(inputs.members, conversation._id, user._id);
                const payload = { code: 200, data: { group: conversation, groupMembers: conversationMembers }, message: 'Group created.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = lodash_1.default.pick(Object.assign(Object.assign({}, request.body), request.params), ['name']);
            const name = inputs && inputs.name ? inputs.name + "-" + new Date().getTime() : '';
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const group = yield service_1.conversationService.updateOne({ name, updatedBy: user._id }, { _id: inputs.id });
                const payload = { code: 200, data: group, message: 'Group created.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
    }
}
exports.PersonalFinanceController = new PersonalFinance();
