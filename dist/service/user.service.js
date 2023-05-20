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
exports.userService = void 0;
const lodash_1 = require("lodash");
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class UserService extends model_service_1.Model {
    constructor() {
        super(model_1.User);
        this.hidden = ['__v', 'isActive', 'password', 'createdBy', 'updatedBy'];
        this.validatePassword = ({ email, password, }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.User.findOne({ email });
            if (!user) {
                return false;
            }
            // const isValid = await user.comparePassword(password);
            const isValid = yield model_1.User.findOne({ email, password });
            if (!isValid) {
                return false;
            }
            return (0, lodash_1.omit)(user.toJSON(), "password");
        });
    }
}
exports.userService = new UserService();
