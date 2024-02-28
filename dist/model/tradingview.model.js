"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tradingview = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TradingviewSchema = new mongoose_1.default.Schema({
    datetime: { type: String, default: null },
    timestamp: { type: Number, default: null },
    timeframe: { type: String, default: null },
    orderId: { type: Number, default: new Date().getTime() },
    type: { type: String, default: null },
    exchange: { type: String, default: null },
    symbol: { type: String, default: null },
    price: { type: Number, default: null },
    volume: { type: Number, default: null },
    isActive: { type: Number, default: 1 },
    createdBy: { type: String, default: null },
    updatedBy: { type: String, default: null },
}, { timestamps: true });
exports.Tradingview = mongoose_1.default.model("Tradingview", TradingviewSchema);
