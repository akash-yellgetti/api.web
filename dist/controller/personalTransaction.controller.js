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
exports.PersonalTransactionController = void 0;
const service_1 = require("../service");
const utils_1 = require("../utils");
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importDefault(require("mongoose"));
class PersonalTransaction {
    constructor() {
        this.create = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const inputs = lodash_1.default.pick(Object.assign(Object.assign({}, request.body), request.params), [
                'date',
                'title',
                'amount',
                'type'
            ]);
            // const name: string = inputs && inputs.name ? inputs.name : '';
            const user = request.user;
            utils_1.log.info('controller.User.detail');
            try {
                const persoanlTransaction = yield service_1.persoanlTransactionService.create(Object.assign({ userId: user._id }, inputs));
                const payload = {
                    code: 200,
                    data: persoanlTransaction,
                    message: 'persoanlTransaction created.'
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
                const transactions = yield service_1.persoanlTransactionService.aggregate(query);
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
exports.PersonalTransactionController = new PersonalTransaction();
