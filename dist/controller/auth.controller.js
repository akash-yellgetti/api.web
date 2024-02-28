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
exports.AuthController = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const setting_1 = require("../config/setting");
const service_1 = require("../service");
const utils_1 = require("../utils");
class Auth {
    constructor() {
        this.generateOTP = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            try {
                const query = {
                    where: {
                        mobileNo: inputs.mobileNo,
                        type: inputs.type,
                        isActive: 1,
                    }
                };
                const tempOtp = yield service_1.otpService.read(query.where);
                if (tempOtp.length > 0) {
                    yield service_1.otpService.update(query.where, { isActive: 0 });
                }
                const no = Math.floor((Math.random() * 9000) + 1000);
                const createData = {
                    "mobileNo": inputs["mobileNo"],
                    "type": inputs["type"],
                    "no": no
                };
                const data = yield service_1.otpService.create(createData);
                const message = "Your OTP to register/access ITSLETS is " + createData.no + ". Please do not share it with anyone.";
                // sms([createData.mobileNo], message);
                return new utils_1.Api(response).success().code(200).send({ data, message: 'OTP generated Succesful' });
            }
            catch (e) {
                console.log(e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.verifyOTP = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.auth.register');
            try {
                const query = {
                    where: {
                        mobileNo: inputs.mobileNo,
                        type: inputs.type,
                        isActive: 1,
                    }
                };
                const temp = yield service_1.otpService.readOne(query.where);
                if (temp && temp.try == 3) {
                    const err = { code: 200, data: temp, message: "Max try reached please regenerate the otp" };
                    return new utils_1.Api(response).error().code(402).send(err);
                }
                if (temp && temp.no === parseInt(inputs.no)) {
                    return new utils_1.Api(response).success().code(200).send({ data: temp, message: "Otp Verified Successfully" });
                }
                const noTry = parseInt(temp.try) + 1;
                const updateData = yield service_1.otpService.update(query.where, { try: noTry });
                return new utils_1.Api(response).error().code(211).send({ data: updateData, message: "Otp Doesn't match" });
            }
            catch (e) {
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.register = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.auth.register');
            try {
                const user = yield service_1.userService.create(inputs);
                return new utils_1.Api(response).success().code(200).send({ data: user, message: "Registered Succesful" });
            }
            catch (e) {
                const code = e && e.code ? e.code : 400;
                utils_1.log.error('controller.auth.register', Object.assign({}, e));
                return new utils_1.Api(response).error().code(code).send(Object.assign({}, e));
            }
        });
        this.login = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            utils_1.log.info('controller.auth.login');
            // validate the email and password
            const user = yield service_1.userService.validatePassword(request.body);
            if (!user) {
                return new utils_1.Api(response).error().code(401).send({ data: null, message: "Invalid username or password" });
            }
            // Create a session
            const session = yield service_1.sessionService.createSession(user._id, request.get("user-agent") || "");
            // create access token
            const accessToken = service_1.sessionService.createAccessToken({
                user,
                session,
            });
            // create refresh token
            const refreshToken = jwt_utils_1.jwt.sign(session, {
                expiresIn: setting_1.setting["refreshTokenTtl"], // 1 year
            });
            // send refresh & access token back
            return new utils_1.Api(response).success().code(200).send({ data: { user, tokens: { accessToken, refreshToken } }, message: 'Login Succesful' });
        });
        this.check = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.auth.check');
            try {
                const payload = { data: user, message: 'authenicated successfully.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.resetPassword = () => {
        };
        this.forgotPassword = () => {
        };
    }
}
exports.AuthController = new Auth();
