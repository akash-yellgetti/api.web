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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excel = void 0;
const XLSX = __importStar(require("xlsx"));
const _ = __importStar(require("lodash"));
class Excel {
    static CONVERT_TO_JSON(excelBuffer) {
        const workbook = XLSX.read(excelBuffer, {
            raw: false,
            // type: 'binary',
            // cellDates: true,
            // cellNF: false,
            // cellText: false
        });
        const sheetNameList = workbook.SheetNames;
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNameList[0]], { defval: null });
        return json;
    }
    static MULTIPLE_SHEET_CONVERT_TO_JSON(excelBuffer) {
        const workbook = XLSX.read(excelBuffer);
        const sheetNameList = workbook.SheetNames;
        const json = {};
        _.each(sheetNameList, (sheetName, key) => {
            json[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { defval: null });
        });
        return json;
    }
    static date2ms(d) {
        let date = new Date(Math.round((d - 25569) * 864e5));
        // date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        return date;
    }
    static transform(array, keyToReplace) {
        return array.map((item) => Object.fromEntries(Object.entries(item).map(([key, value]) => [
            keyToReplace[key] || key,
            value
        ])));
    }
}
exports.Excel = Excel;
