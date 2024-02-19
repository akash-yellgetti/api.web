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
exports.UserController = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const service_1 = require("../service");
const utils_1 = require("../utils");
const lodash_1 = __importDefault(require("lodash"));
class User {
    constructor() {
        this.profilePicture = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const user = request.user;
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const files = request.files;
            utils_1.log.info('controller.User.profilePicture');
            // console.log('inputs', inputs);
            // console.log('files', files);
            try {
                const updateData = {};
                let profilePicture = lodash_1.default.find(files, { fieldname: 'profilePicture' });
                if (profilePicture) {
                    profilePicture = this.saveImage(profilePicture, user);
                    updateData['profilePicture'] = profilePicture;
                }
                let profilePictureBackground = lodash_1.default.find(files, { fieldname: 'profilePictureBackground' });
                if (profilePictureBackground) {
                    profilePictureBackground = this.saveImage(profilePictureBackground, user);
                    updateData['profilePictureBackground'] = profilePictureBackground;
                }
                if (Object.keys(updateData).length > 0) {
                    yield service_1.userService.updateOne({ _id: user._id }, updateData);
                }
                const payload = { code: 200, data: updateData, message: 'User Profile Picture Uploaded' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.saveImage = (file, user) => {
            const newFileName = new Date().getTime() + "_" + lodash_1.default.toLower(file.originalname);
            const filesDir = path_1.default.join(__dirname, '../public/uploads/' + user._id + '/profile');
            // check if directory exists
            if (!fs_1.default.existsSync(filesDir)) {
                // if not create directory
                fs_1.default.mkdirSync(filesDir, { recursive: true });
            }
            const targetPath = 'uploads/' + user._id + '/profile/' + newFileName;
            const newFile = fs_1.default.createWriteStream(path_1.default.join(__dirname, '../public/' + targetPath)).write(file.buffer);
            return targetPath;
        };
        this.detail = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const detail = yield service_1.userService.readOne({ _id: user._id });
                console.log('detail', detail);
                const payload = { code: 200, data: detail, message: 'User detail' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
        this.update = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = lodash_1.default.pick(Object.assign(Object.assign({}, request.body), request.params), ['firstName', 'lastName']);
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const updateData = Object.assign({}, inputs);
                if (Object.keys(updateData).length > 0) {
                    yield service_1.userService.updateOne({ _id: user._id }, updateData);
                }
                const payload = { code: 200, data: updateData, message: 'Updated User details.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e);
                return new utils_1.Api(response).error().code(200).send(e);
            }
        });
    }
}
exports.UserController = new User();
