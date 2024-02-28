"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.logs = void 0;
const pino_1 = __importDefault(require("pino"));
const winston_1 = __importDefault(require("winston"));
require('winston-mongodb');
// const winston = require('winston');
exports.logs = (0, pino_1.default)({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            // timestamp: () => `,"time":"${dayjs().format()}"`,
        }
    }
});
const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};
const formatter = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: 'YYYY-MMM-DD HH:mm:ss' }), 
// winston.format.splat(),
winston_1.default.format.printf((info) => {
    const { timestamp, level, message } = info, meta = __rest(info, ["timestamp", "level", "message"]);
    return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''}`;
}));
class Logger {
    constructor() {
        // const transportFile = new winston.transports.File({
        //   filename: 'logs.log',
        //   format: formatter,
        // });
        const transportConsole = new winston_1.default.transports.Console({
            format: formatter,
        });
        // const transportMongoDB = new winston.transports.MongoDB({
        //   //mongo database connection link
        //   db: 'mongodb://admin:passw0rd1@194.195.116.219/app?authSource=admin',
        //   options: {
        //     useUnifiedTopology: true
        //   },
        //   // A collection to save json formatted logs
        //   collection: 'server_logs',
        // });
        this.logger = winston_1.default.createLogger({
            transports: [
                // transportFile,
                transportConsole,
                // transportMongoDB
            ],
        });
    }
    trace(msg, meta) {
        this.logger.log('trace', msg, meta);
    }
    debug(msg, meta) {
        this.logger.debug(msg, meta);
    }
    info(msg, meta) {
        this.logger.info(msg, meta);
    }
    warn(msg, meta) {
        this.logger.warn(msg, meta);
    }
    error(msg, meta) {
        this.logger.error(msg, meta);
    }
    fatal(msg, meta) {
        this.logger.log('fatal', msg, meta);
    }
}
exports.log = new Logger();
