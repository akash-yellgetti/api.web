"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.budget = void 0;
const yup_1 = require("yup");
exports.budget = {
    create: (0, yup_1.object)({
        body: (0, yup_1.object)({
            type: (0, yup_1.string)().required("Type is required"),
            category: (0, yup_1.string)().required("Category is required"),
            subcategory: (0, yup_1.string)().required("Sub-Category is required"),
            title: (0, yup_1.string)().required("Title is required"),
            description: (0, yup_1.string)(),
            amount: (0, yup_1.string)().required("Amount is required"),
        }),
    }),
};
