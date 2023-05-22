"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationMessageService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class ConversationMessageService extends model_service_1.Model {
    constructor() {
        super(model_1.ConversationMessage);
    }
}
exports.conversationMessageService = new ConversationMessageService();
