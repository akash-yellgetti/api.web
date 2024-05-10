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
exports.resolvers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const service_1 = require("../service");
exports.resolvers = {
    getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.userService.read();
    }),
    getUser: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield service_1.userService.readOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
            const contacts = yield service_1.contactService.read({ userId: new mongoose_1.default.Types.ObjectId(id) });
            user.contacts = contacts;
            return user;
        }
        catch (error) {
            throw new Error('Failed to fetch users with contacts');
        }
    }),
    createUser: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.userService.create(args);
    }),
    getConstants: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.constantService.read(args.input);
    }),
    createConstant: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.constantService.create(args.input);
    }),
    getBudget: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.budgetService.read(args.input);
    }),
    createBudget: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.budgetService.create(args.input);
    }),
    bulkCreateBudget: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.budgetService.bulkCreate(args.input);
    }),
    deleteBudget: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.plannerService.hardDeleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
    }),
    getPlanner: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.plannerService.read(args.input);
    }),
    createPlanner: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.plannerService.create(args.input);
    }),
    deletePlanner: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.plannerService.hardDeleteOne(args.input);
    }),
    getDevices: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.deviceService.read();
    }),
    createDevice: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.deviceService.create(args.input);
    }),
    getSockets: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.socketService.read(args.input);
    }),
    createSocket: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.socketService.create(args.input);
    }),
    getContacts: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.contactService.read();
    }),
    createContact: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.contactService.create(args.input);
    }),
    getConversations: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.conversationService.read();
    }),
    createConversation: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.conversationService.create(args.input);
    }),
    getUserConversations: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.conversationMemberService.read({ userId: new mongoose_1.default.Types.ObjectId(id) });
    }),
    getConversationMembers: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.conversationMemberService.read();
    }),
    createConversationMember: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.conversationMemberService.create(args.input);
    }),
    getConversationMessages: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.conversationMessageService.read();
    }),
    createConversationMessage: (args) => __awaiter(void 0, void 0, void 0, function* () {
        return yield service_1.conversationMessageService.create(args.input);
    }),
};
