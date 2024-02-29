"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradingview = void 0;
const yup_1 = require("yup");
exports.tradingview = {
    webhook: (0, yup_1.object)({
        body: (0, yup_1.object)({
            type: (0, yup_1.string)().required(),
            exchange: (0, yup_1.string)().required(),
            symbol: (0, yup_1.string)().required('Symbol is required'),
            price: (0, yup_1.number)().required('Symbol Price is required'),
            qty: (0, yup_1.number)().required('Quantity is required'),
            datetime: (0, yup_1.string)().required('Datetime is required'),
            timestamp: (0, yup_1.string)().required('TimeStamp is required'),
            timeframe: (0, yup_1.string)().required('Timeframe is required'),
            volume: (0, yup_1.number)().required('volume is required'),
        })
    })
};
