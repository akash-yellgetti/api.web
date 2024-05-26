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
exports.TransactionController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importDefault(require("mongoose"));
const excel_util_1 = require("../utils/excel.util");
class Transaction {
    constructor() {
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const errors = [];
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            if (inputs && !inputs.title) {
                // errors.push({ file: 'File is required.' });
                errors.push({
                    path: "body.title",
                    type: "required",
                    message: 'Title is required.',
                });
            }
            const file = request.files[0];
            if (!file) {
                errors.push({
                    path: "body.file",
                    type: "required",
                    message: 'File is required.',
                });
            }
            if (errors && errors.length > 0) {
                return new utils_1.Api(response).code(400).error().send({ message: 'Validation Failed.', data: errors });
            }
            const files = request.files;
            // const self: any = this;
            // const file: any = _.find(files, { fieldname: 'file' });
            const fileData = excel_util_1.Excel.CONVERT_TO_JSON(file.buffer);
            const keyToReplace = {
                'Date': 'date',
                'Description': 'description',
                'Credit': 'credit',
                'Debit': 'debit',
                'Balance': 'balance'
            };
            let data = excel_util_1.Excel.transform(fileData, keyToReplace);
            data = lodash_1.default.map(data, (item) => {
                return Object.assign({ transactionDate: excel_util_1.Excel.date2ms(item.date) }, item);
            });
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const Transaction = yield service_1.transactionService.create({
                    userId: user._id,
                    title: inputs.title,
                    description: inputs.description || '#',
                    data: data
                });
                const payload = {
                    code: 200,
                    data: Transaction,
                    message: 'Transaction created.'
                };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
        this.list = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = Object.assign(Object.assign({}, request.body), request.params);
            const user = request.user;
            utils_1.log.info('controller.auth.check');
            try {
                const query = [
                    {
                        $match: {
                            userId: new mongoose_1.default.Types.ObjectId(user._id)
                        }
                    },
                    {
                        $addFields: {
                            transactionMonth: { $month: "$date" },
                        },
                    },
                    {
                        $match: {
                            transactionMonth: inputs.month
                        }
                    }
                ];
                const transactions = yield service_1.transactionService.aggregate(query);
                const payload = { data: transactions, message: 'transaction list.' };
                return new utils_1.Api(response).success().code(200).send(payload);
            }
            catch (e) {
                utils_1.log.error(e.message, e);
                return new utils_1.Api(response).error().code(400).send(e);
            }
        });
    }
}
exports.TransactionController = new Transaction();
