import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { setting } from "../config/setting";

export interface TradingviewDocument extends mongoose.Document {
    datetime: string;
    timestamp: Number;
    timeframe: string;
    orderId: number;
    type: string;
    exchange: string;
    symbol: string;
    price: number;
    volume: number;
    isActive: number;
}

const TradingviewSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export const Tradingview = mongoose.model<TradingviewDocument>("Tradingview", TradingviewSchema);
