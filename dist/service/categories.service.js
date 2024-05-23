"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesService = void 0;
const model_service_1 = require("./model.service");
const model_1 = require("../model");
class CategoriesService extends model_service_1.Model {
    constructor() {
        super(model_1.Categories);
        this.populate = [
            {
                path: 'subcategories', model: 'Categories', strictPopulate: false,
            }
        ];
    }
}
exports.categoriesService = new CategoriesService();
