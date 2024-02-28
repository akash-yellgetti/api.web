import { Model } from "./model.service";
import { Tradingview } from "../model";

class TradingviewService extends Model {
  constructor() {
    super(Tradingview);
  } 
}


export const tradingviewService = new TradingviewService();