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
exports.conversationService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importDefault(require("mongoose"));
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class ConversationService extends model_service_1.Model {
    constructor() {
        super(model_1.Conversation);
        this.hidden = ['__v', 'password', 'createdBy', 'updatedBy'];
        this.populate = [
            { path: 'members', model: 'ConversationMember', strictPopulate: true, populate: { path: 'user', model: 'User' } },
            { path: 'messages', model: 'ConversationMessage', strictPopulate: true, populate: { path: 'user', model: 'User' } },
        ];
        this.getConversations = (inputs, user) => __awaiter(this, void 0, void 0, function* () {
            const userIds = [user._id];
            const ids = lodash_1.default.map(userIds, (r) => {
                return new mongoose_1.default.Types.ObjectId(r);
            });
            const query = [
                {
                    $lookup: {
                        from: "conversationmembers",
                        let: {
                            id: "$_id",
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: ["$$id", "$conversationId"],
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "users",
                                    localField: "userId",
                                    foreignField: "_id",
                                    as: "user",
                                },
                            },
                            {
                                $addFields: {
                                    user: { $first: "$user" },
                                },
                            },
                        ],
                        as: "members",
                    },
                },
                {
                    $lookup: {
                        from: "conversationmessages",
                        localField: "_id",
                        foreignField: "conversationId",
                        as: "messages",
                    },
                },
                {
                    $match: {
                        "members.userId": new mongoose_1.default.Types.ObjectId(user._id)
                    }
                }
            ];
            // console.log(query)
            return yield this.aggregate(query);
        });
        this.getConversation = (inputs) => __awaiter(this, void 0, void 0, function* () {
            const user = inputs.user;
            return this.model.findOne({ type: inputs.type }).populate({
                path: 'members', model: 'ConversationMember', strictPopulate: false,
                match: { userId: { $in: [user._id, inputs.refUser._id] } },
            }).lean();
        });
    }
}
exports.conversationService = new ConversationService();
