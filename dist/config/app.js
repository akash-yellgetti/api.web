"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.App = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const setting_1 = require("./setting");
const utils_1 = require("../utils");
const route_1 = require("./route");
const error_handler_util_1 = __importDefault(require("../utils/error-handler.util"));
const processExceptionHandler_1 = require("./processExceptionHandler");
const socket_1 = require("./socket");
class App {
    constructor() {
        /**
        * As the name suggest loads all required setting for the express app
        */
        this.initialize = () => {
            // Printing the api calls
            this.app.use((0, morgan_1.default)('dev'));
            // for parsing application/raw
            this.app.use(body_parser_1.default.raw({ limit: '50MB' }));
            // for parsing application/json
            this.app.use(body_parser_1.default.json({ limit: '50MB' }));
            // for parsing application/xwww-form-urlencoded
            this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: false }));
            // Serving Static Files
            // this.app.use(express.static(path.resolve(__dirname,'../views/app')));
            this.app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public')));
            // For api setting
            this.app.use((0, cors_1.default)());
            this.app.use(error_handler_util_1.default);
            this.app.use(route_1.route);
            // this.app.get('/', (req, res) => {
            //   res.sendFile(path.resolve(__dirname,'../views/app/index.html'));
            // });
            this.app.get('/', this.ping);
            this.app.get('/ping', this.ping);
            this.app.get('/socket', (req, res) => {
                res.sendFile(path_1.default.resolve(__dirname, '../views/socket.html'));
            });
            // Webhook endpoint
            this.app.post('/webhook', (req, res) => {
                const alert = req.body;
                console.log('Received alert:', alert);
                // Here you can add your logic to handle the alert
                res.status(200).send('Alert received');
            });
        };
        this.cors = () => {
        };
        this.listen = () => {
            this.server.listen(setting_1.setting["port"], () => {
                utils_1.log.info(`| Name : ${setting_1.setting["program"]} | Mode : ${setting_1.setting["mode"]} | Version : ${setting_1.setting["version"]} | Port : ${setting_1.setting["port"]} |`);
            });
        };
        this.ping = (req, res) => {
            const data = {
                project: 'Welcome to Backend - ' + setting_1.setting["program"],
                mode: setting_1.setting["mode"],
                dateTime: new Date(new Date().toUTCString()),
                version: setting_1.setting["version"]
            };
            return new utils_1.Api(res).success().code(200).send({ data, message: 'Ping Reponse' });
        };
        this.processExceptionHandler = () => {
            process.on('unhandledRejection', processExceptionHandler_1.processExceptionHandler.unhandledRejection);
            process.on('uncaughtException', processExceptionHandler_1.processExceptionHandler.uncaughtException);
            process.on('warning', processExceptionHandler_1.processExceptionHandler.warning);
            // const infoObject: any = {
            //   type: 'server',
            //   program: setting["program"],
            //   mode: setting["mode"],
            //   timestamp: new Date(),
            // };
            // process
            //   .on('unhandledRejection', (reason: any, p) => {
            //     infoObject.message = 'Process unhandled rejection';
            //     infoObject.data = JSON.stringify({
            //       p,
            //       reason: reason.stack || reason,
            //     });
            //     log.error(infoObject);
            //     // return new Api(response).error().code(200).send(reason);
            //   })
            //   .on('uncaughtException', (err) => {
            //     infoObject.message = 'Process uncaught exception';
            //     infoObject.data = JSON.stringify({
            //       reason: err.stack || err,
            //     }),
            //     log.error(infoObject);
            //   });
        };
        this.getSocketIO = () => {
            return socket_1.socket.getIo();
        };
        const app = (0, express_1.default)();
        this.app = app;
        const server = http_1.default.createServer(app);
        if (setting_1.setting && setting_1.setting.socket) {
            socket_1.socket.initiate(server);
        }
        this.server = server;
        this.listen();
        this.processExceptionHandler();
        this.initialize();
        this.cors();
        // if(setting && setting.db) {
        //   db.setConfig(setting.db).connect();
        // }
    }
    // tslint:disable-next-line
    static getInstance() {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }
}
exports.App = App;
exports.app = App.getInstance();
