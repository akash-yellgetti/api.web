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
exports.Model = void 0;
const lodash_1 = require("lodash");
const utils_1 = require("../utils");
const lodash_2 = __importDefault(require("lodash"));
class Model {
    constructor(model) {
        this.hidden = [];
        this.populate = [];
        this.create = (inputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.create(inputs);
            }
            catch (error) {
                this.errorHandler(error);
            }
        });
        this.bulkCreate = (inputs) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.insertMany(inputs);
            }
            catch (error) {
                this.errorHandler(error);
            }
        });
        this.read = (query = {}, limit = 25, sort = { _id: 1 }) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find(query).populate(this.populate).sort(sort).limit(limit).lean();
            }
            catch (error) {
                this.errorHandler(error);
            }
        });
        this.readOne = (query) => __awaiter(this, void 0, void 0, function* () {
            const hidden = this.hidden || [];
            // console.log(this.model)
            const data = yield this.model.findOne(query).populate(this.populate).lean();
            return (0, lodash_1.omit)(data, hidden);
        });
        this.update = (where, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.updateMany(where, updateData, {
                new: true,
                upsert: true // Make this update into an upsert
            });
        });
        this.updateOne = (where, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOneAndUpdate(where, updateData, {
                new: true,
                upsert: true // Make this update into an upsert
            });
        });
        // Soft Delete
        this.hardDelete = (where) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.remove(where);
        });
        // Soft Delete
        this.softDelete = (where, updateData) => __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findOneAndUpdate(where, updateData, {
                new: true,
                upsert: true // Make this update into an upsert
            });
        });
        // Aggregate
        this.aggregate = (query) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.aggregate(query).exec();
            }
            catch (error) {
                this.errorHandler(error);
            }
        });
        // Aggregate One
        this.aggregateOne = (query, condition) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.aggregate(query);
                return lodash_2.default.find(data, condition);
            }
            catch (error) {
                this.errorHandler(error);
            }
        });
        this.errorHandler = (error) => {
            utils_1.log.error(error);
            const res = { code: 422, message: null };
            switch (error.code) {
                case 11000:
                    res.message = `Duplicate ${JSON.stringify(error.keyValue)} is not allowed`;
                    throw res;
                    break;
                default:
                    res.message = 'Data validation failed.';
                    res.data = error.errors;
                    throw res;
                    break;
            }
        };
        this.model = model;
    }
}
exports.Model = Model;
