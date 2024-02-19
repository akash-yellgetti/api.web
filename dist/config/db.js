"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("../utils");
class DB {
    constructor() {
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        this.setConfig = (config) => {
            this.config = config;
            return this;
        };
        this.getConfig = () => {
            return this.config;
        };
        this.connect = () => {
            const config = this.getConfig();
            const uri = `mongodb+srv://${config.user}:${config.password}@${config.host}/?retryWrites=true&w=majority`;
            // const uri =
            //   config.user && config.password
            //     ? `mongodb://${config.user}:${config.password}@${config.host}/${config.db}?authSource=admin`
            //     : `mongodb://${config.host}/${config.db}?authSource=admin`;
            mongoose_1.default.set('strictQuery', false);
            mongoose_1.default.connect(uri, this.options);
            mongoose_1.default.connection.on('connected', this.connected);
            mongoose_1.default.connection.on('reconnected', this.reconnected);
            mongoose_1.default.connection.on('disconnected', this.disconnected);
            mongoose_1.default.connection.on('error', this.error);
        };
        this.connected = (err, res) => {
            if (err) {
                utils_1.log.error('mongoose connection issue', err);
            }
            else {
                utils_1.log.info('mongoose is connected', res);
            }
        };
        this.reconnected = (err, res) => {
            utils_1.log.info('mongoose has reconnected');
        };
        this.disconnected = (err, res) => {
            utils_1.log.error('Mongo connection is disconnected');
        };
        this.error = (err) => {
            utils_1.log.error('mongoose connection issue', err);
        };
    }
    // tslint:disable-next-line
    static getInstance() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }
}
exports.db = DB.getInstance();
