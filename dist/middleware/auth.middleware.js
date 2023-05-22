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
exports.auth = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const service_1 = require("../service");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, lodash_1.get)(req, "headers.authorization", "").replace(/^JWT\s/, "");
    const refreshToken = (0, lodash_1.get)(req, "headers.x-refresh");
    if (!accessToken) {
        return new utils_1.Api(res).code(401).error().send({ message: 'No Token Found.' });
    }
    ;
    // if (!accessToken) return next();
    const { decoded, expired } = utils_1.jwt.decode(accessToken);
    if (!decoded) {
        return new utils_1.Api(res).code(401).error().send({ message: 'Invalid Token Found.' });
    }
    if (decoded) {
        // @ts-ignore
        req.user = decoded;
        return next();
    }
    if (expired && refreshToken) {
        const newAccessToken = yield service_1.sessionService.reIssueAccessToken({ refreshToken });
        if (newAccessToken) {
            // Add the new access token to the response header
            res.setHeader("x-access-token", newAccessToken);
            const { decoded } = utils_1.jwt.decode(newAccessToken);
            // @ts-ignore
            req.user = decoded;
        }
        return next();
    }
    return next();
});
exports.auth = auth;
