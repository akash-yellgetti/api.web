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
exports.sessionService = void 0;
const setting_1 = require("../config/setting");
const lodash_1 = require("lodash");
const model_1 = require("../model");
const jwt_utils_1 = require("../utils/jwt.utils");
const user_service_1 = require("./user.service");
class SessionService {
    constructor() {
        this.createSession = (userId, userAgent) => __awaiter(this, void 0, void 0, function* () {
            const session = yield model_1.Session.create({ user: userId, userAgent });
            return session.toJSON();
        });
        this.createAccessToken = ({ user, session, }) => {
            // Build and return the new access token
            const accessToken = jwt_utils_1.jwt.sign(Object.assign(Object.assign({}, user), { session: session._id }), { expiresIn: setting_1.setting["accessTokenTtl"] } // 15 minutes
            );
            return accessToken;
        };
        this.reIssueAccessToken = ({ refreshToken, }) => __awaiter(this, void 0, void 0, function* () {
            // Decode the refresh token
            const { decoded } = jwt_utils_1.jwt.decode(refreshToken);
            if (!decoded || !(0, lodash_1.get)(decoded, "_id"))
                return false;
            // Get the session
            const session = yield model_1.Session.findById((0, lodash_1.get)(decoded, "_id"));
            // Make sure the session is still valid
            if (!session || !(session === null || session === void 0 ? void 0 : session.valid))
                return false;
            const user = yield user_service_1.userService.read({ _id: session.userId });
            if (!user)
                return false;
            const accessToken = this.createAccessToken({ user, session });
            return accessToken;
        });
        this.updateSession = (query, update) => __awaiter(this, void 0, void 0, function* () {
            return model_1.Session.updateOne(query, update);
        });
        this.findSessions = (query) => __awaiter(this, void 0, void 0, function* () {
            return model_1.Session.find(query).lean();
        });
    }
}
exports.sessionService = new SessionService();
