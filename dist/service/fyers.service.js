"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.fyersService = void 0;
const FyersAPI = require("fyers-api-v3");
const fs = __importStar(require("fs"));
const url = __importStar(require("url"));
// const querystring = require('querystring');
class FyersService {
    constructor() {
        this.appId = "B58SG84OC9-100";
        this.secretKey = "KAKGI8UDV9";
        this.redirectUrl = "http://api.fyers.uat/fyers/access-token";
        this.authCode = null;
        this.accessToken = null;
        this.refreshToken = null;
        this.fyers = new FyersAPI.fyersModel();
    }
    config() {
        // Set your APPID obtained from Fyers (replace "xxx-1xx" with your actual APPID)
        this.fyers.setAppId(this.appId);
        // Set the RedirectURL where the authorization code will be sent after the user grants access
        // Make sure your redirectURL matches with your server URL and port
        this.fyers.setRedirectUrl(this.redirectUrl);
    }
    initialize() {
        this.config();
        const filePath = 'fyers.data.json';
        // Read file synchronously
        const jsonString = fs.readFileSync(filePath, 'utf-8');
        // Parse JSON string
        const data = JSON.parse(jsonString);
        this.authCode = data.authCode;
        this.accessToken = data.accessToken;
        this.refreshToken = data.refreshToken;
        // set access Token
        this.fyers.setAccessToken(this.accessToken);
    }
    getAuthCode() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.config();
                return this.fyers.generateAuthCode();
            }
            catch (error) {
                throw new Error(`Authentication failed: ${error.message}`);
            }
        });
    }
    getAccessToken(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = 'fyers.authcode';
                // Read the file asynchronously using fs.promises.readFile
                const str = yield fs.promises.readFile(filePath, 'utf8');
                // const urlParams = url.split('?')[1];
                const queryParameters = url.parse(str, true).query;
                // set auth-code
                this.authCode = inputs.auth_code || queryParameters.auth_code;
                // config
                this.config();
                // get access token
                const data = yield this.fyers.generate_access_token({ "secret_key": this.secretKey, "auth_code": this.authCode });
                // create fyers.data.json   
                const json = { authCode: this.authCode, accessToken: data.access_token, refreshToken: data.refresh_token };
                fs.writeFileSync("./fyers.data.json", JSON.stringify(json, null, 2));
                this.accessToken = data.access_token;
                this.refreshToken = data.refresh_token;
                return json;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Authentication failed: ${error.message}`);
            }
        });
    }
    getProfile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to check funds
                this.initialize();
                return (yield this.fyers.get_profile()).data;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Failed to check funds: ${error.message}`);
            }
        });
    }
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.initialize();
                const data = yield this.fyers.get_orders();
                return data;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Failed to check funds: ${error.message}`);
            }
        });
    }
    orderPlace(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to check funds
                const reqBody = {
                    "symbol": "MCX:SILVER24MARFUT",
                    "qty": 1,
                    "type": 2,
                    "side": 1,
                    "productType": "INTRADAY",
                    "limitPrice": 0,
                    "stopPrice": 0,
                    "validity": "DAY",
                    "disclosedQty": 0,
                    "offlineOrder": false,
                    "stopLoss": 0,
                    "takeProfit": 0,
                    "orderTag": "tag1"
                };
                this.initialize();
                const data = yield this.fyers.place_order(reqBody);
                return data;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Failed to check funds: ${error.message}`);
            }
        });
    }
    checkFunds() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to check funds
            }
            catch (error) {
                throw new Error(`Failed to check funds: ${error.message}`);
            }
        });
    }
    checkBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to check balance
            }
            catch (error) {
                throw new Error(`Failed to check balance: ${error.message}`);
            }
        });
    }
    placeOrder(orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to place order
            }
            catch (error) {
                throw new Error(`Failed to place order: ${error.message}`);
            }
        });
    }
    setStopLoss(orderId, stopLossPrice) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to set stop-loss for an order
            }
            catch (error) {
                throw new Error(`Failed to set stop-loss: ${error.message}`);
            }
        });
    }
    setTrailingStopLoss(orderId, trailValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to set trailing stop-loss for an order
            }
            catch (error) {
                throw new Error(`Failed to set trailing stop-loss: ${error.message}`);
            }
        });
    }
    cancelOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to cancel an order
            }
            catch (error) {
                throw new Error(`Failed to cancel order: ${error.message}`);
            }
        });
    }
    getOrderStatus(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to get the status of an order
            }
            catch (error) {
                throw new Error(`Failed to get order status: ${error.message}`);
            }
        });
    }
    getOrderHistory() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to retrieve order history
            }
            catch (error) {
                throw new Error(`Failed to retrieve order history: ${error.message}`);
            }
        });
    }
    getPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to retrieve open positions
                this.initialize();
                const data = yield this.fyers.get_positions();
                return data;
            }
            catch (error) {
                throw new Error(`Failed to retrieve positions: ${error.message}`);
            }
        });
    }
    getHistoricalData(symbol, interval, from, to) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Implement logic to retrieve historical market data
            }
            catch (error) {
                throw new Error(`Failed to retrieve historical data: ${error.message}`);
            }
        });
    }
}
exports.fyersService = new FyersService();
