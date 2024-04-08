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
exports.ContactController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
const mongoose_1 = __importDefault(require("mongoose"));
class Contact {
    constructor() {
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.contact.list');
            try {
                const data = yield service_1.contactService.read({ userId: user._id });
                return new utils_1.Api(response).success().code(200).send({ data });
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            inputs.userId = request.user._id;
            utils_1.log.info('controller.contact.created');
            try {
                const user = yield service_1.contactService.create(inputs);
                return new utils_1.Api(response).success().code(200).send({ data: user, message: "created Succesful" });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.contact.created', Object.assign({}, e));
                return new utils_1.Api(response).error().code(code).send(Object.assign({}, e));
            }
        });
        this.detail = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const detail = yield service_1.contactService.readOne({ _id: inputs._id });
                console.log('detail', detail);
                const payload = { code: 200, data: detail, message: 'contact detail' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.refresh = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.contact.refresh');
            try {
                const userContacts = yield service_1.contactService.read({ userId: new mongoose_1.default.Types.ObjectId(user._id) });
                for (let i in userContacts) {
                    const contact = userContacts[i];
                    console.log('refUser', contact.refUser);
                    if (contact && contact.refUser && !contact.conversationId) {
                        let conversation = yield service_1.conversationService.getConversation({ type: 'individual', user, refUser: contact.refUser });
                        console.log('conversation', conversation);
                        if (!conversation || (conversation && conversation.members && conversation.members.length !== 2)) {
                            conversation = yield service_1.conversationService.create({ type: 'individual' });
                            const conversationMember = yield service_1.conversationMemberService.bulkCreate([
                                { conversationId: conversation._id, userId: user._id },
                                { conversationId: conversation._id, userId: contact.refUser._id }
                            ]);
                        }
                        contact.conversationId = conversation._id;
                        service_1.contactService.updateOne({ _id: contact._id, userId: new mongoose_1.default.Types.ObjectId(user._id) }, { conversationId: conversation._id });
                    }
                }
                const payload = { code: 200, data: userContacts, message: 'contact refresh' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
    }
}
exports.ContactController = new Contact();
