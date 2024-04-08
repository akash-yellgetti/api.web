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
exports.conversationMemberService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
const mongoose_1 = __importDefault(require("mongoose"));
const lodash_1 = __importDefault(require("lodash"));
class ConversationMemberService extends model_service_1.Model {
    constructor() {
        super(model_1.ConversationMember);
        this.populate = ['user'];
        this.addUsers = (userIds, conversationId, userId) => __awaiter(this, void 0, void 0, function* () {
            const data = [];
            const users = [...userIds, userId];
            for (const i in users) {
                if (Object.prototype.hasOwnProperty.call(users, i)) {
                    data.push({ conversationId, userId: users[i], createdBy: userId, updatedBy: userId });
                }
            }
            return yield this.bulkCreate(data);
        });
        this.getConversations = (inputs, user) => __awaiter(this, void 0, void 0, function* () {
            const userIds = [user._id];
            const ids = lodash_1.default.map(userIds, (r) => {
                return new mongoose_1.default.Types.ObjectId(r);
            });
            const query = [
                {
                    $lookup: {
                        from: "conversations",
                        foreignField: "_id",
                        localField: "conversationId",
                        as: "conversationDetail"
                    }
                },
                {
                    $unwind: {
                        path: '$conversationDetail',
                        preserveNullAndEmptyArrays: false
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        foreignField: "_id",
                        localField: "userId",
                        as: "userDetail"
                    }
                },
                {
                    $unwind: {
                        path: '$userDetail',
                        preserveNullAndEmptyArrays: false
                    }
                },
                {
                    $group: {
                        _id: '$conversationId',
                        users: { "$addToSet": "$userDetail" },
                        // usersDetail: { "$addToSet": "$userDetail" },
                        conversationDetail: { "$first": "$conversationDetail" }
                    }
                },
                { "$match": { "users._id": { "$in": ids } } }
            ];
            const conversations = yield this.aggregate(query);
            for (let i in conversations) {
                if (conversations[i]) {
                    const conversation = conversations[i];
                    conversation['history'] = yield this.read({
                        conversationId: conversation._id
                    }, 10, { _id: -1 });
                }
            }
            return conversations;
        });
        this.getConversation = (inputs, user) => __awaiter(this, void 0, void 0, function* () {
            const conservations = yield this.getConversations(inputs, user);
            const conversation = lodash_1.default.find(conservations, { _id: inputs.conservationId });
        });
    }
}
exports.conversationMemberService = new ConversationMemberService();
