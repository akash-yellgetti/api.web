"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationMessageService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class ConversationMessageService extends model_service_1.Model {
    constructor() {
        super(model_1.ConversationMessage);
        this.hidden = ['__v', 'password', 'createdBy', 'updatedBy'];
        this.populate = [
            { path: 'user', model: 'User' },
            { path: 'conversation', model: 'Conversation' },
        ];
    }
}
exports.conversationMessageService = new ConversationMessageService();
